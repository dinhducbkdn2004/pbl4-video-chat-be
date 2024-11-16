import notificationModel from '../notification.model'
import { Types } from 'mongoose'

export const updateNotification = async (notificationId: string, isRead: boolean) => {
    const notification = await notificationModel.findById(notificationId)

    if (!notification) {
        throw new Error('Không tìm thấy thông báo với ID đã cho.')
    }

    notification.isRead = isRead
    await notification.save()

    return notification
}
