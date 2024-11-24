import chatRoomModel from '../../chat-room/chatRoom.model'
import { Types } from 'mongoose'
import messageModel from '../message.model'

const seenMessage = async (userId: string, chatRoomId: string) => {
    const chatRoom = await chatRoomModel.findById(chatRoomId)
    if (!chatRoom) {
        throw new Error('Phòng chat không tồn tại')
    }
    if (!chatRoom.participants.includes(new Types.ObjectId(userId))) {
        throw new Error('Bạn không ở trong phòng chat')
    }

    await messageModel.updateMany({ chatRoom: chatRoomId, isRead: { $ne: userId } }, { $addToSet: { isRead: userId } })

    const messages = await messageModel
        .find({
            chatRoom: chatRoomId,
            isRead: { $in: [userId] }
        })
        .populate('sender', 'name avatar')
        .populate('isRead', 'name avatar')

    return messages
}
export default seenMessage
