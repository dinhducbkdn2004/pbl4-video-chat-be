import mongoose from 'mongoose'
import { Types } from 'mongoose'
import userModel from '~/api/v1/user/user.model'
import friendRequestModel from '~/api/v1/friend-request/friendRequest.model'
import { createNotification } from '../../notifications/services/createNotification'

const revokeFriendRequest = async (senderId: string, requestId: string) => {
    const request = await friendRequestModel.findById(requestId)
    if (!request) throw new Error('Không tìm thấy yêu cầu kết bạn')

    if (!request.sender.equals(senderId)) {
        throw new Error('Không có quyền: Chỉ người gửi mới có thể thu hồi yêu cầu')
    }

    if (request.status === 'ACCEPTED') {
        throw new Error('Không thể thu hồi yêu cầu đã được chấp nhận hoặc từ chối')
    }
    const receiverId = request.receiver.toString()

    await friendRequestModel.deleteOne({ _id: requestId })
    await userModel.findByIdAndUpdate(receiverId, { $pull: { receivedRequests: senderId } })
    await userModel.findByIdAndUpdate(senderId, { $pull: { sentRequests: receiverId } })
}

export default revokeFriendRequest
