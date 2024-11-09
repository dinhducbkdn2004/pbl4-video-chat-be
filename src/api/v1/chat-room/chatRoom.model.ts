import mongoose, { Schema, Types } from 'mongoose'
import modelOption from '../../../configs/model.config'

export type TypeRoom = 'OneToOne' | 'Group'
export type Privacy = 'PUBLIC' | 'PRIVATE'

export interface IChatRoom {
    name: string
    chatRoomImage: string
    createdBy: Types.ObjectId
    participants: Types.ObjectId[]
    admins: Types.ObjectId[]
    moderators: Types.ObjectId[]
    messages: Types.ObjectId[]
    isBlocked: Map<string, Map<string, boolean>>
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
        admins: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
                required: function () {
                    return this.typeRoom === 'Group'
                }
            }
        ],
        moderators: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users',
                required: false
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Messages',
                default: []
            }
        ],
        isBlocked: {
            type: Map, // Lưu trữ trạng thái block giữa người dùng
            of: Map, // Sử dụng Map bên trong để block theo cặp người dùng
            default: {}
        },
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
