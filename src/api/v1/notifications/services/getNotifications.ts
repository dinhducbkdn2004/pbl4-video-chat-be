import { getPagination } from '~/helpers/pagination'
import userModel from '../../user/user.model'
import notificationModel from '../../notifications/notification.model'
import { IFriendRequest } from '../../friend-request/friendRequest.model'
import { IChatRoom } from '../../chat-room/chatRoom.model'

export const getNotifications = async (userId: string, page: number, limit: number) => {
    const pagination = getPagination(page, limit)

    // Lấy danh sách thông báo từ người dùng và populate từ bảng Notifications
    const notifications = await notificationModel
        .find({ userId })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .sort({ createdAt: -1 })

    for (const notification of notifications) {
        switch (notification.type) {
            case 'ChatRooms':
                await notification.populate<{ detail: IChatRoom }>({
                    path: 'detail'
                })
                break
            case 'FriendRequests':
                await notification.populate<{ detail: IFriendRequest }>({
                    path: 'detail'
                })
                break
        }
    }

    return notifications
}
