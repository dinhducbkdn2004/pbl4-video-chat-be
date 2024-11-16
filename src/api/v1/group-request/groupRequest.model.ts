import mongoose, { Types } from 'mongoose'
import modelOption from '../../../configs/model.config'

export interface IGroupRequest {
    chatRoomId: Types.ObjectId
    message: string
    createBy: Types.ObjectId
    status: GroupRequestStatus
}

export type GroupRequestStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'CANCELED'

const GroupRequestSchema = new mongoose.Schema<IGroupRequest>(
    {
        chatRoomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatRooms',
            required: true
        },
        message: {
            type: String,
            required: true
        },
        createBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        status: {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'DECLINED'],
            default: 'PENDING'
        }
    },
    modelOption
)

const groupRequestModel = mongoose.model<IGroupRequest>('GroupRequests', GroupRequestSchema)
export default groupRequestModel
