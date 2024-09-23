import { getIO } from '~/socket/socket'
import chatRoomModel from '../../chat-room/chatRoom.model'
import messageModel from '../message.model'

const createMessage = async (
    sender: string,
    content: string,
    chatRoomId: string,
    type: 'Text' | 'Media' | 'Document' | 'Link',
    file?: string
) => {
    const chatRoom = await chatRoomModel.findById(chatRoomId).populate('participants', 'name avatar isOnlie socketId')
    console.log('chatRoom: ', chatRoom)
    if (chatRoom === null) throw 'Không tìm thấy chat room!'

    const message = await messageModel.create({
        sender,
        content,
        chatRoom: chatRoomId,
        type,
        file
    })

    chatRoom.messages.push(message._id)
    chatRoom.lastMessage = message._id
    await chatRoom.save()

    const newMessage = await messageModel.findById(message._id).populate('sender', 'name avatar _id')
    if (newMessage === null) throw 'Lỗi get'
    const io = getIO()
    io.to(
        chatRoom.participants
            .filter((person: any) => person.isOnline && person._id.toString() !== sender)
            .map((person: any) => person.socketId)
    ).emit('server send new message', message)
    return newMessage
}
export default createMessage
