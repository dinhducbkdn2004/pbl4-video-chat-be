import chatRoomModel from '../../chatRoom.model'
import { Types } from 'mongoose'
import { notificationService } from '../../../notifications/notification.service'

const changeRole = async (chatRoomId: string, userId: string, adminId: string, role: 'admin' | 'moderator') => {
    const chatRoom = await chatRoomModel.findById(chatRoomId)
    if (!chatRoom || chatRoom.typeRoom !== 'Group') {
        throw new Error('Phòng chat không tồn tại hoặc không phải là nhóm.')
    }

    const isAdmin = chatRoom.admins.includes(new Types.ObjectId(adminId))

    if (!isAdmin) {
        throw new Error('Chỉ có admin mới có quyền thay đổi vai trò.')
    }

    if (!chatRoom.participants.includes(new Types.ObjectId(userId))) {
        throw new Error('Người dùng không có trong phòng chat.')
    }

    if (role === 'admin') {
        if (!chatRoom.admins.includes(new Types.ObjectId(userId))) {
            chatRoom.admins.push(new Types.ObjectId(userId))
            if (chatRoom.moderators.includes(new Types.ObjectId(userId))) {
                chatRoom.moderators = chatRoom.moderators.filter((moderator) => !moderator.equals(userId))
                await notificationService.createNotification(
                    `Bạn đã được thăng chức thành admin trong phòng chat ${chatRoom.name}`,
                    userId,
                    'ChatRooms',
                    chatRoomId
                )
            }
        } else {
            throw new Error('Người dùng đã là admin.')
        }
    } else if (role === 'moderator') {
        if (!chatRoom.moderators.includes(new Types.ObjectId(userId))) {
            chatRoom.moderators.push(new Types.ObjectId(userId))
            if (chatRoom.admins.includes(new Types.ObjectId(userId))) {
                chatRoom.admins = chatRoom.admins.filter((admin) => !admin.equals(userId))
                await notificationService.createNotification(
                    `Bạn đã được thăng chức thành moderator trong phòng chat ${chatRoom.name}`,
                    userId,
                    'ChatRooms',
                    chatRoomId
                )
            }
        } else {
            throw new Error('Người dùng đã là moderator.')
        }
    }

    await chatRoom.save()
    return chatRoom
}

export default changeRole
