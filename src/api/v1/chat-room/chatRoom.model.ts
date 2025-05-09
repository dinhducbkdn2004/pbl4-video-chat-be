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
    typeRoom: TypeRoom
    privacy: Privacy
    lastMessage: Types.ObjectId
    isOnline: boolean
}

const ChatRoomSchema = new mongoose.Schema<IChatRoom>(
    {
        name: { type: String, default: '' },
        chatRoomImage: {
            type: String,
            default: function () {
                return this.typeRoom === 'Group'
                    ? 'https://png.pngtree.com/png-vector/20190810/ourlarge/pngtree-friends-group-users-team-blue-dotted-line-line-icon-png-image_1655482.jpg'
                    : ''
            }
        },
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
