import mongoose from 'mongoose'
import modelOption from '../../../configs/model.config'

const NotificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        type: {
            type: String,
            enum: ['MESSAGE', 'FRIEND_REQUEST'],
            required: true
        },
        message: { type: String },
        isRead: { type: Boolean, default: false }
    },
    modelOption
)

const notificationModel = mongoose.model('Notifications', NotificationSchema)
export default notificationModel
