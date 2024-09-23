import mongoose from 'mongoose'
import modelOption from '../../../configs/model.config'

const ChatRoomSchema = new mongoose.Schema(
    {
        name: { type: String, default: '' },
        createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
                required: true
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Messages',
                default: []
            }
        ],
        typeRoom: { type: String, enum: ['OneToOne', 'Group'], required: true },
        privacy: {
            type: String,
            enum: ['PUBLIC', 'PRIVATE'],
            required: true
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages'
        }
    },
    modelOption
)

const chatRoomModel = mongoose.model('ChatRooms', ChatRoomSchema)
export default chatRoomModel
