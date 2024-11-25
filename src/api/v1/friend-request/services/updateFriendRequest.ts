import mongoose from 'mongoose'
import userModel from '~/api/v1/user/user.model'
import friendRequestModel from '~/api/v1/friend-request/friendRequest.model'
import { createNotification } from '../../notifications/services/createNotification'

const updateFriendRequest = async (receiverId: string, requestId: string, status: 'ACCEPTED' | 'DECLINED') => {
    if (!['ACCEPTED', 'DECLINED'].includes(status)) {
        throw new Error('Trạng thái không hợp lệ')
    }

    const request = await friendRequestModel.findById(requestId)
    if (!request) throw new Error('Không tìm thấy yêu cầu kết bạn')

    if (!request.receiver.equals(receiverId)) {
        throw new Error('Không có quyền: Bạn chỉ có thể cập nhật yêu cầu gửi tới bạn')
    }

    const [senderUser, receiverUser] = await Promise.all([
        userModel.findById(request.sender),
        userModel.findById(receiverId)
    ])

    if (!senderUser || !receiverUser) {
        throw new Error('Người gửi hoặc người nhận không tồn tại')
    }

    request.status = status
    const updatedRequest = await request.save()

    if (status === 'ACCEPTED') {
        await Promise.all([
            userModel.updateOne(
                { _id: senderUser._id },
                { $addToSet: { friends: receiverUser._id }, $pull: { sentRequests: receiverId } }
            ),
            userModel.updateOne(
                { _id: receiverUser._id },
                { $addToSet: { friends: senderUser._id }, $pull: { receivedRequests: senderUser._id } }
            )
        ])
        await createNotification(
            'Yêu cầu kết bạn của bạn đã được chấp nhận!',
            senderUser._id.toString(),
            'FriendRequests',
            updatedRequest._id.toString()
        )
    } else if (status === 'DECLINED') {
        await Promise.all([
            userModel.findByIdAndUpdate(senderUser._id, { $pull: { sentRequests: receiverId } }),
            userModel.findByIdAndUpdate(receiverUser._id, { $pull: { receivedRequests: senderUser._id } }),
            friendRequestModel.deleteOne({ _id: requestId })
        ])
    }

    return {
        requestId: updatedRequest._id,
        status: updatedRequest.status,
        sender: { id: senderUser._id, name: senderUser.name },
        receiver: { id: receiverUser._id, name: receiverUser.name }
    }
}

export default updateFriendRequest
