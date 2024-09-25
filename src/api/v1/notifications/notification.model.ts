import mongoose from 'mongoose'
import modelOption from '../../../configs/model.config'
export type NotificationTypes = 'MESSAGE' | 'FRIEND_REQUEST'
const NotificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        type: {
            type: String,
            enum: ['MESSAGE', 'FRIEND_REQUEST'],
            required: true
        },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        detail: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    modelOption
)

const notificationModel = mongoose.model('Notifications', NotificationSchema)
export default notificationModel
