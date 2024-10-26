import { IUser } from '../../user/user.model'
import chatRoomModel from '../chatRoom.model'

export const getChatRoomById = async (chatRoomId: string) => {
    const room = await chatRoomModel
        .findById(chatRoomId)
        .populate<{ participants: IUser[] }>('participants', 'name avatar socketId isCalling')

    if (room === null) throw 'Không tìm thấy chat room'
    // if (room.typeRoom === 'OneToOne') {
    //     // Find the other participant (opponent)
    //     const opponent = room.participants.find((participant) => participant._id.toString() !== userId)
    //
    //     room.name = opponent?.name || ''
    //     room.chatRoomImage = opponent?.avatar || ''
    //     room.isOnline = opponent?.isOnline || false
    // }
    return room
}
