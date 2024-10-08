import chatRoomModel from '../chatRoom.model'
import { Types } from 'mongoose'
import { notificationService } from '../../notifications/notification.service'

const removeMember = async (chatRoomId: string, memberId: string, adminId: string) => {
    const chatRoom = await chatRoomModel.findById(chatRoomId)
    if (!chatRoom || chatRoom.typeRoom !== 'Group') {
        throw new Error('Phòng chat không tồn tại hoặc không phải là nhóm.')
    }

    if (!chatRoom.admins.includes(new Types.ObjectId(adminId))) {
        throw new Error('Bạn không có quyền thực hiện hành động này.')
    }

    if (!chatRoom.participants.includes(new Types.ObjectId(memberId))) {
        throw new Error('Thành viên không có trong phòng chat.')
    }

    chatRoom.participants = chatRoom.participants.filter((participant) => !participant.equals(memberId))

    await chatRoom.save()

    await notificationService.createNotification(
        `Bạn đã bị xóa khỏi phòng chat ${chatRoom.name}`,
        memberId,
        'MESSAGE',
        chatRoomId
    )

    return chatRoom
}

export default removeMember
