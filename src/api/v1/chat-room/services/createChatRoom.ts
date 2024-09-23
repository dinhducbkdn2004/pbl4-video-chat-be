import chatRoomModel from '../chatRoom.model'

const createChatRoom = async (
    createdBy: string,
    paticipants: string[],
    name: string,
    privacy: 'PUBLIC' | 'PRIVATE'
) => {
    paticipants.push(createdBy)
    const room = await chatRoomModel.create({
        createdBy,
        name,
        participants: paticipants,
        privacy,
        typeRoom: paticipants.length === 2 ? 'OneToOne' : 'Group'
    })
    return room
}
export default createChatRoom
