import notificationModel from '../notification.model'

export const seenAllNotifications = async (userId: string) => {
    const result = await notificationModel.updateMany({ userId: userId, isRead: false }, { $set: { isRead: true } })

    return result
}
