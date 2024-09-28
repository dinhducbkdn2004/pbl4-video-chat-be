import mongoose from 'mongoose'
import userModel from '~/api/v1/user/user.model'
import friendRequestModel from '~/api/v1/friend-request/friendRequest.model'

const updateFriendRequest = async (receiverId: string, requestId: string, status: 'ACCEPTED' | 'DECLINED') => {
    const request = await friendRequestModel.findById(requestId)
    if (!request) throw new Error('Không tìm thấy yêu cầu kết bạn')

    if (receiverId !== request.receiver.toString()) {
        throw new Error('Không có quyền: Bạn chỉ có thể cập nhật yêu cầu gửi tới bạn')
    }

    const senderUser = await userModel.findById(request.sender)
    const receiverUser = await userModel.findById(receiverId)

    if (!senderUser || !receiverUser) {
        throw new Error('Người gửi hoặc người nhận không tồn tại')
    }

    request.status = status
    const updatedRequest = await request.save()

    if (status === 'ACCEPTED') {
        if (!senderUser.friends.includes(receiverUser._id)) {
            senderUser.friends.push(receiverUser._id)
        }
        if (!receiverUser.friends.includes(senderUser._id)) {
            receiverUser.friends.push(senderUser._id)
        }
        await senderUser.save()
        await receiverUser.save()
    }

    return { updatedRequest, senderUser, receiverUser }
}
export default updateFriendRequest
