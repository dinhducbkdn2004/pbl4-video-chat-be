import { getPagination } from '~/helpers/pagination'
import userModel, { IUser } from '../user/user.model'
import groupRequestModel, { GroupRequestStatus } from './groupRequest.model'
import chatRoomService from '../chat-room/chatRoom.service'
import chatRoomModel from '../chat-room/chatRoom.model'
import { notificationService } from '../notifications/notification.service'

export const groupRequestService = {
    async getRequestByChatRoomId(chatRoomId: string, page: number = 1, limit: number = 10) {
        const pagination = getPagination(page, limit)
        return groupRequestModel
            .find({
                chatRoomId,
                status: 'PENDING'
            })
            .populate<{ createBy: IUser }>('createBy', 'name avatar')
            .skip(pagination.skip)
            .limit(pagination.limit)
    },

    async create({ chatRoomId, message, createBy }: { chatRoomId: string; message: string; createBy: string }) {
        const chatRoom = await chatRoomModel.findById(chatRoomId)
        if (!chatRoom) {
            throw new Error('Phòng chat không tồn tại!')
        }

        const existingRequest = await groupRequestModel.findOne({
            chatRoomId: chatRoomId,
            createBy: createBy,
            status: 'PENDING'
        })

        if (existingRequest) {
            throw new Error('Yêu cầu vào nhóm đã được gửi trước đó!')
        }

        if (chatRoom!.participants.some((id) => id.equals(createBy)))
            throw new Error('Người dùng đã ở trong phòng chat')

        const user = await userModel.findById(createBy)
        if (!user) {
            throw new Error('Người dùng không tồn tại!')
        }
        const managers = [...(chatRoom.admins || []), ...(chatRoom.moderators || [])]

        await Promise.all(
            managers.map((manager) =>
                notificationService.createNotification(
                    `${user.name} đã gửi yêu cầu vào nhóm ${chatRoom.name}`,
                    manager.toString(),
                    'ChatRooms',
                    chatRoom._id.toString()
                )
            )
        )

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
        const user = await userModel.findById(request.createBy)
        if (!user) throw new Error('Người dùng không tồn tại!')

        if (!chatRoom) throw new Error('Phòng chat không tồn tại!')

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

                await notificationService.createNotification(
                    `Bạn đã vào nhóm ${chatRoom.name}`,
                    request.createBy.toString(),
                    'ChatRooms',
                    chatRoom._id.toString()
                )

                const membersToNotify = chatRoom.participants.filter((id) => !id.equals(request.createBy))
                await Promise.all(
                    membersToNotify.map((memberId) =>
                        notificationService.createNotification(
                            `${user.name} đã vào nhóm ${chatRoom.name}`,
                            memberId.toString(),
                            'ChatRooms',
                            chatRoom._id.toString()
                        )
                    )
                )
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
            .populate<{ createBy: IUser }>('createBy', 'name avatar')
            .skip(pagination.skip)
            .limit(pagination.limit)
    }
}
