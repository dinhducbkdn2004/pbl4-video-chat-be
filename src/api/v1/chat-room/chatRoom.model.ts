import mongoose, { Schema, Types } from 'mongoose'
import modelOption from '../../../configs/model.config'

export type TypeRoom = 'OneToOne' | 'Group'
export type Privacy = 'PUBLIC' | 'PRIVATE'

export interface IChatRoom {
    name: string
    chatRoomImage: string
    createdBy: Types.ObjectId
    participants: Types.ObjectId[]
    messages: Types.ObjectId[]
    typeRoom: TypeRoom
    privacy: Privacy
    lastMessage: Types.ObjectId
    isOnline: boolean
}

const ChatRoomSchema = new mongoose.Schema<IChatRoom>(
    {
        name: { type: String, default: '' },
        chatRoomImage: { type: String, default: '' },
        createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
        participants: [
            {
                type: Schema.Types.ObjectId,
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

const chatRoomModel = mongoose.model<IChatRoom>('ChatRooms', ChatRoomSchema)
export default chatRoomModel
