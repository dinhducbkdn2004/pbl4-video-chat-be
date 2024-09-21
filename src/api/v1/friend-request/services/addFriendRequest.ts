import mongoose from 'mongoose'
import userModel from '../../user/user.model'
import friendRequestModel from '../friendRequest.model'

const sendAddFriendRequest = async (senderId: string, receiverId: string, caption: string) => {
    if (senderId === receiverId) throw 'Không thể kết bạn với chính mình'

    const receiver = await userModel.findById(receiverId).select('friends')

    if (receiver?.friends.includes(new mongoose.Types.ObjectId(senderId)))
        throw 'Không thể kết bạn vì 2 người đã là bạn'

    const request = await friendRequestModel.create({
        sender: senderId,
        receiver: receiverId,
        status: 'PENDING',
        caption
    })
    const newRequest = await friendRequestModel
        .findById(request._id)
        .populate('sender', 'name avatar _id')
        .populate('receiver', 'name avatar _id')
    if (!newRequest) throw 'Lỗi create'

    return newRequest
}
export default sendAddFriendRequest
