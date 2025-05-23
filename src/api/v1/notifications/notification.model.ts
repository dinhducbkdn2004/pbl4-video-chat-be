import mongoose, { Types } from 'mongoose'
import modelOption from '../../../configs/model.config'
export type NotificationTypes = 'ChatRooms' | 'FriendRequests'
export interface INotification {
    userId: Types.ObjectId
    type: NotificationTypes
    message: string
    isRead: boolean
    detail: Types.ObjectId
}
const NotificationSchema = new mongoose.Schema<INotification>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        type: {
            type: String,
            enum: ['ChatRooms', 'FriendRequests'],
            required: true
        },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        detail: {
            refPath: 'type',
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    modelOption
)

const notificationModel = mongoose.model<INotification>('Notifications', NotificationSchema)
export default notificationModel
