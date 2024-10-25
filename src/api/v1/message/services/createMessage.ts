import { getIO } from '~/configs/socket.config'
import chatRoomModel, { IChatRoom } from '../../chat-room/chatRoom.model'
import messageModel, { IMessage, MessageType } from '../message.model'
import { IUser } from '../../user/user.model'

const createMessage = async (messageData: Omit<IMessage, 'isRead'>) => {
    const { chatRoom: chatRoomId, sender, content, type, fileUrl: file } = messageData
    const chatRoom = await chatRoomModel.findById(chatRoomId).populate('participants', 'name avatar isOnlie socketId')

    if (chatRoom === null) throw 'Không tìm thấy chat room!'

    const message = await messageModel.create({
        sender,
        content,
        chatRoom: chatRoomId,
        type,
        fileUrl: file,
        isRead: []
    })


    chatRoom.messages.push(message._id)
    chatRoom.lastMessage = message._id
    await chatRoom.save()

    const newUpdatedChatRoom = await chatRoomModel.findById(chatRoom._id).populate<{ lastMessage: IMessage[] }>({
        path: 'lastMessage', // Populate lastMessage first
        select: '_id sender content type createdAt updatedAt', // Select fields in lastMessage
        populate: {
            path: 'sender', // Nested populate for sender
            select: 'name avatar' // Select fields from the sender (user model)
        }
    }).populate<{ participants: IUser[] }>('participants', 'name avatar')

    if (newUpdatedChatRoom!.typeRoom === 'OneToOne') {
        // Find the other participant (opponent)
        const opponent = newUpdatedChatRoom!.participants.find((participant) => participant._id.toString() !== sender.toString())
        newUpdatedChatRoom!.name = opponent?.name || ''
        newUpdatedChatRoom!.chatRoomImage = opponent?.avatar || ''
        newUpdatedChatRoom!.isOnline = opponent?.isOnline || false
    }


    const newMessage = await messageModel.findById(message._id).populate('sender', 'name avatar _id')!

    const io = getIO()
    io.to(
        newUpdatedChatRoom!.participants.filter((person: any) => person.isOnline).map((person: any) => person.socketId)
    ).emit('new message', newMessage)

    io.to(
        newUpdatedChatRoom!.participants.filter((person: any) => person.isOnline).map((person: any) => person.socketId)
    ).emit('updated chatroom', newUpdatedChatRoom)
    return { newMessage, newUpdatedChatRoom }
}

export default createMessage
