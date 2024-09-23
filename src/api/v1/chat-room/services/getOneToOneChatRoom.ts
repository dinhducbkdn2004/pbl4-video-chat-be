import chatRoomModel from '../chatRoom.model'

export const getOneToOneChatRoom = async (senderId: string, receiverId: string) => {
    const chatRoom = await chatRoomModel.findOne({
        typeRoom: 'OneToOne',
        participants: {
            $all: [senderId, receiverId],
            $size: 2
        }
    })
    return chatRoom
}
