import chatRoomModel from '../chatRoom.model'
import { Types } from 'mongoose'
import { notificationService } from '../../notifications/notification.service'

const removeMember = async (chatRoomId: string, memberId: string, adminId: string) => {
    const chatRoom = await chatRoomModel.findById(chatRoomId)

    if (!chatRoom || chatRoom.typeRoom !== 'Group') {
        throw new Error('Phòng chat không tồn tại hoặc không phải là nhóm.')
    }

    const isAdmin = chatRoom.admins.includes(new Types.ObjectId(adminId))
    const isModerator = chatRoom.moderators.includes(new Types.ObjectId(adminId))
    const donotdelete = chatRoom.admins.includes(new Types.ObjectId(memberId))

    if (isModerator) {
        if (donotdelete) {
            throw new Error('Bạn không có quyền xóa Admin ra khỏi nhóm')
        }
    } else if (!isAdmin && !isModerator) {
        throw new Error('Bạn không có quyền xóa thành viên')
    }

    if (!chatRoom.participants.includes(new Types.ObjectId(memberId))) {
        throw new Error('Thành viên không có trong phòng chat.')
    }

    chatRoom.participants = chatRoom.participants.filter((participant) => !participant.equals(memberId))

    await chatRoom.save()

    await notificationService.createNotification(
        `Bạn đã bị xóa khỏi phòng chat ${chatRoom.name}`,
        memberId,
        'ChatRooms',
        chatRoomId
    )
    return chatRoom
}

export default removeMember
