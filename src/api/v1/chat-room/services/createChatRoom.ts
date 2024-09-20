import chatRoomModel from '../chatRoom.model'

const createChatRoom = async (paticipants: string[], name: string) => {
    const room = await chatRoomModel.create({
        name,
        participants: paticipants,
        isGroupChat: paticipants.length > 2,
        typeRoom: 'PRIVATE'
    })
    return room
}
export default createChatRoom
