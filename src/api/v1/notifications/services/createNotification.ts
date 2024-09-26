import notificationModel, { NotificationTypes } from '../notification.model'
import userModel from '../../user/user.model'
import mongoose from 'mongoose'
import { getIO } from '~/configs/socket.config'

export const createNotification = async (
    message: string,
    userId: string,
    type: NotificationTypes,
    detailId: string
) => {
    const user = await userModel.findById(userId)
    if (!user) throw 'Không tìm thấy user'

    const notification = await notificationModel.create({ userId, message, type, detail: detailId })
    user.notifications.push(notification._id)
    await user.save()
    if (user.isOnline)
        getIO()
            .to(user.socketId as string)
            .emit('new notification', notification)
    return notification
}
