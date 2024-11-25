import mongoose from 'mongoose'
import userModel from '../../user/user.model'
import friendRequestModel from '../friendRequest.model'
import { createNotification } from '../../notifications/services/createNotification'

const sendAddFriendRequest = async (senderId: string, receiverId: string, caption: string) => {
    if (senderId === receiverId) throw new Error('Không thể kết bạn với chính mình!')

    const receiver = await userModel.findById(receiverId).select('friends')

    if (!receiver) throw new Error('Người nhận không tồn tại.')

    if (receiver.friends.some((friendId) => friendId.toString() === senderId)) {
        throw new Error('Không thể kết bạn vì 2 người đã là bạn!')
    }

    const existingRequest = await friendRequestModel.findOne({
        sender: senderId,
        receiver: receiverId,
        status: 'PENDING'
    })

    if (existingRequest) {
        throw new Error('Lời mời kết bạn đã được gửi trước đó!')
    }

    const request = await friendRequestModel.create({
        sender: senderId,
        receiver: receiverId,
        status: 'PENDING',
        caption
    })

    const newRequest = await friendRequestModel.findById(request._id)

    if (!newRequest) throw new Error('Lỗi tạo yêu cầu kết bạn!')

    await createNotification('Bạn có một lời mời kết bạn mới', receiverId, 'FriendRequests', newRequest.id.toString())
    return newRequest
}

export default sendAddFriendRequest
