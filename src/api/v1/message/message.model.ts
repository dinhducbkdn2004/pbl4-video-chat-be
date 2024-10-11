import mongoose, { Types } from 'mongoose'
import modelOption from '../../../configs/model.config'
export type MessageType = 'Text' | 'Picture' | 'Document' | 'Link' | 'Video'
export interface IMessage {
    chatRoom: Types.ObjectId
    sender: Types.ObjectId
    content?: string
    type: MessageType
    fileUrl?: string
    isRead: Types.ObjectId[]
}
const MessageSchema = new mongoose.Schema<IMessage>(
    {
        chatRoom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatRooms',
            required: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        content: {
            type: String
        },
        type: {
            type: String,
            enum: ['Text', 'Video', 'Picture', 'Document', 'Link']
        },
        fileUrl: {
            type: String
        },
        isRead: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
            required: true,
            default: []
        }
    },
    modelOption
)

const messageModel = mongoose.model<IMessage>('Messages', MessageSchema)
export default messageModel
