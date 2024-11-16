import notificationModel from '../notification.model'
import userModel from '../../user/user.model'
import { Types } from 'mongoose'

export const deleteNotification = async (notificationId: string) => {
    console.log(notificationId)

    const notification = await notificationModel.findById(notificationId)

    if (!notification) {
        throw new Error('Không tìm thấy thông báo với ID đã cho.')
    }

    await notification.deleteOne()

    // Xóa notificationId khỏi danh sách thông báo của người dùng
    await userModel.updateOne(
        { _id: notification.userId }, // Tìm user
        { $pull: { notifications: new Types.ObjectId(notificationId) } } // Xóa notificationId
    )

    return notification
}
