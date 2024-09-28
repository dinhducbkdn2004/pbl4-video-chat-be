import mongoose, { Types } from 'mongoose'
import modelOption from '../../../configs/model.config'
export type FriendRequestStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED'
export interface IFriendRequest {
    sender: Types.ObjectId
    receiver: Types.ObjectId
    status: FriendRequestStatus
    caption: string
}

const FriendRequestSchema = new mongoose.Schema<IFriendRequest>(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        status: {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'DECLINED'],
            default: 'PENDING'
        },
        caption: {
            type: String,
            require: true
        }
    },
    modelOption
)

const friendRequestModel = mongoose.model<IFriendRequest>('FriendRequests', FriendRequestSchema)
export default friendRequestModel
