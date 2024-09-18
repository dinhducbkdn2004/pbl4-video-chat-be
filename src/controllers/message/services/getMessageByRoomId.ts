import messageModel from '../../../models/message.model';
import { Types } from 'mongoose';
const getMessagesByChatRoomId = async (chatRoomId: string, page: number = 1, limit: number = 10) => {
    const messages = await messageModel
        .find({ chatRoom: chatRoomId })
        .populate('sender', 'username')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    return messages;
};
export default getMessagesByChatRoomId;
