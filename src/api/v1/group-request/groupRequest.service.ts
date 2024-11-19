import { getPagination } from '~/helpers/pagination'
import { IUser } from '../user/user.model'
import groupRequestModel, { GroupRequestStatus } from './groupRequest.model'
import chatRoomService from '../chat-room/chatRoom.service'
import chatRoomModel from '../chat-room/chatRoom.model'

export const groupRequestService = {
    async getRequestByChatRoomId(chatRoomId: string, page: number = 1, limit: number = 10) {
        const pagination = getPagination(page, limit)
        return groupRequestModel
            .find({
                chatRoomId
            })
            .populate<{ createBy: IUser }>('name avatar')
            .skip(pagination.skip)
            .limit(pagination.limit)
    },

    async create({ chatRoomId, message, createBy }: { chatRoomId: string; message: string; createBy: string }) {
        const chatRoom = await chatRoomModel.findById(chatRoomId)
        if (chatRoom!.participants.some((id) => id.equals(createBy))) throw 'Người dùng đã ở trong phòng chat'
        return groupRequestModel.create({
            chatRoomId,
            message,
            createBy
        })
    },

    async findById(requestId: string) {
        const request = await groupRequestModel.findById(requestId)
        if (!request) throw 'Yêu cầu không tồn tại'
        return request
    },

    async update({ requestId, status, updateBy }: { requestId: string; status: GroupRequestStatus; updateBy: string }) {
        const request = await this.findById(requestId)
        const chatRoom = await chatRoomModel.findById(request.chatRoomId)

        if (chatRoom!.participants.some((id) => id.equals(request.createBy))) throw 'Người dùng đã ở trong phòng chat'

        if (chatRoom?.typeRoom === 'OneToOne') throw 'Không thể thêm người vào phòng chat 1 - 1'

        if (request.status === 'ACCEPTED') throw 'Yêu cầu đã được chấp nhận'

        if (request.status === 'DECLINED') throw 'Yêu cầu đã bị từ chối'

        if (status === 'CANCELED') {
            if (request.createBy.toString() !== updateBy) throw 'Bạn không có quyền hủy yêu cầu này'
        }

        if (status === 'ACCEPTED' || status === 'DECLINED') {
            const hasPermission =
                chatRoom!.admins.some((id) => id.equals(updateBy)) ||
                chatRoom!.moderators.some((id) => id.equals(updateBy))

            if (request.status === 'CANCELED') throw 'Yêu cầu đã bị hủy bởi người tạo'

            if (!hasPermission) throw 'Bạn không có quyền chấp nhận yêu cầu này'

            if (status === 'ACCEPTED') {
                chatRoom!.participants.push(request.createBy)

                await chatRoom!.save()
            }
        }
        const newRequest = await groupRequestModel.findByIdAndUpdate(
            requestId,
            {
                status,
                updateBy
            },
            { new: true }
        )
        if (!newRequest) throw 'Yêu cầu không tồn tại'
        return newRequest
    },
    async getAllRequestOfUser({
        page,
        limit,
        userId,
        status
    }: {
        page: number
        limit: number
        userId: string
        status?: GroupRequestStatus
    }) {
        const pagination = getPagination(page, limit)
        type queryOptions = {
            createBy: string
            status?: GroupRequestStatus
        }
        const query: queryOptions = { createBy: userId }
        if (status) query.status = status

        return groupRequestModel
            .find(query)
            .populate<{ createBy: IUser }>('name avatar')
            .skip(pagination.skip)
            .limit(pagination.limit)
    }
}
