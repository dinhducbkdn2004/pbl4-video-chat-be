import messageModel from '../message.model'

const createMessage = async (sender: string, content: string, chatRoom: string) => {
    const message = await messageModel.create({
        sender,
        content,
        chatRoom
    })
    const newMessage = await messageModel.findById(message._id).populate('sender', 'name avatar _id')
    return newMessage
}
export default createMessage
