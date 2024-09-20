import mongoose from 'mongoose'
import modelOption from '../../../configs/model.config'

const FriendRequestSchema = new mongoose.Schema(
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

const friendRequestModel = mongoose.model('FriendRequests', FriendRequestSchema)
export default friendRequestModel
