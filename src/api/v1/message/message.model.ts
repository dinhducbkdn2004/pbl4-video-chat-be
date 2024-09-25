import mongoose from 'mongoose'
import modelOption from '../../../configs/model.config'

const MessageSchema = new mongoose.Schema(
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
        file: {
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

const messageModel = mongoose.model('Messages', MessageSchema)
export default messageModel
