import mongoose from 'mongoose'
import userModel from '~/api/v1/user/user.model'
import friendRequestModel from '~/api/v1/friend-request/friendRequest.model'

const updateFriendRequest = async (senderId: string, requestId: string, status: 'ACCEPTED' | 'DECLINED') => {
    const request = await friendRequestModel.findById(requestId)
    if (!request) throw 'Không tồn tại request'

    if (senderId === request.receiver.toString()) throw 'Không thể kết bạn với chính bạn'

    const senderUser = await userModel.findById(senderId)

    if (senderUser === null) throw 'Sender or Receiver does not exist'

    request.status = status

    const newRequset = await request.save()

    // if (status === 'ACCEPTED') {
    //     senderUser.friends.push(new mongoose.Types.ObjectId(receiverId))
    //     receiverUser.friends.push(new mongoose.Types.ObjectId(senderId))
    //     await senderUser.save()
    //     await receiverUser.save()
    // }

    return newRequset
}
export default updateFriendRequest
