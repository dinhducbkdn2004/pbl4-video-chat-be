import mongoose, { Types } from 'mongoose'
import modelOption from '../../../configs/model.config'
export type MessageType = 'Text' | 'Media' | 'Document' | 'Link'
export interface IMessage {
    chatRoom: Types.ObjectId
    sender: Types.ObjectId
    content: string
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
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['Text', 'Media', 'Document', 'Link']
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
