import notificationModel from '../notification.model'
import { Types } from 'mongoose'

export const seenNotification = async (notificationId: string) => {
    const notification = await notificationModel.findById(notificationId)

    if (!notification) {
        throw new Error('Không tìm thấy thông báo với ID đã cho.')
    }

    notification.isRead = true
    await notification.save()

    return notification
}
