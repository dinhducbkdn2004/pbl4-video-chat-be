import chatRoomModel from '../chatRoom.model'

export const getChatRoomById = async (chatRoomId: string) => {
    const chatRoom = await chatRoomModel.findById(chatRoomId)
    if (chatRoom === null) throw 'Không tìm thấy chat room'
    return chatRoom
}
