import { getPagination } from '~/helpers/pagination'
import userModel from '../../user/user.model'
import notificationModel from '../../notifications/notification.model'

export const getNotifications = async (userId: string, page: number, limit: number) => {
    const pagination = getPagination(page, limit)

    // Lấy danh sách thông báo từ người dùng và populate từ bảng Notifications
    const user = await userModel
        .findById(userId)
        .select('notifications')
        .populate({
            path: 'notifications',
            model: notificationModel, // Populate từ bảng Notifications
            options: { skip: pagination.skip, limit: pagination.limit }
        })

    if (user === null) throw new Error('User không tồn tại')

    const notifications = user.notifications

    return notifications
}
