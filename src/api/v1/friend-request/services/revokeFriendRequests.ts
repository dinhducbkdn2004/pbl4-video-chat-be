import mongoose from 'mongoose'
import userModel from '~/api/v1/user/user.model'
import friendRequestModel from '~/api/v1/friend-request/friendRequest.model'
import { createNotification } from '../../notifications/services/createNotification'
import { Types } from 'mongoose'

const revokeFriendRequest = async (senderId: string, receiverId: string) => {
    const receiver = await userModel.findById(receiverId)

    if (!receiver) {
        throw new Error('Không tìm thấy người nhận.')
    }
    console.log(senderId)
    if (!receiver.receivedRequests.includes(new Types.ObjectId(senderId))) {
        throw new Error('Không thể thu hồi vì không có yêu cầu từ bạn.')
    }

    await friendRequestModel.deleteOne({ sender: senderId, receiver: receiverId, status: 'PENDING' })
    await userModel.findByIdAndUpdate(receiverId, { $pull: { receivedRequests: senderId } })
    await userModel.findByIdAndUpdate(senderId, { $pull: { sentRequests: receiverId } })

    return []
}

export default revokeFriendRequest
