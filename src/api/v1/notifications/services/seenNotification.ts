import notificationModel from '../notification.model'
import { Types } from 'mongoose'

export const seenNotification = async (userId: string, notificationId: string) => {
    if (!Types.ObjectId.isValid(notificationId)) {
        throw new Error('Notification ID không hợp lệ')
    }

    const notification = await notificationModel.findById(notificationId)

    if (!notification) {
        throw new Error('Không tìm thấy thông báo với ID đã cho.')
    }

    if (notification.userId.toString() !== userId) {
        throw new Error('Bạn không có quyền truy cập thông báo này.')
    }
    if (!['MESSAGE', 'FRIEND_REQUEST'].includes(notification.type)) {
        throw new Error('Loại thông báo không hợp lệ!')
    }
    notification.isRead = true
    await notification.save()

    return notification
}
