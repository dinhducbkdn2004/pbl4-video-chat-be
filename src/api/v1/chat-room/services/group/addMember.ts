import { log } from 'console'
import chatRoomModel from '../../chatRoom.model'
import userModel from '../../../user/user.model'
import { notificationService } from '../../../notifications/notification.service'
import { Types } from 'mongoose'

const addMember = async (chatRoomId: string, newMemberId: string, adminId: string) => {
    const chatRoom = await chatRoomModel.findById(chatRoomId)
    if (!chatRoom) throw new Error('Phòng chat không tồn tại')

    if (chatRoom.typeRoom !== 'Group') throw new Error('Chỉ có room nhóm mới có thể thêm thành viên')

    const isAdmin = chatRoom.admins.includes(new Types.ObjectId(adminId))
    const isModerator = chatRoom.moderators.includes(new Types.ObjectId(adminId))

    if (!isAdmin && !isModerator) throw new Error('Chỉ có admin hoặc moderator mới có quyền thêm thành viên')

    if (chatRoom.participants.includes(new Types.ObjectId(newMemberId))) {
        throw new Error('Thành viên đã có trong phòng chat')
    }
    chatRoom.participants.push(new Types.ObjectId(newMemberId))
    await chatRoom.save()

    await notificationService.createNotification(
        `Bạn đã được thêm vào phòng chat ${chatRoom.name}`,
        newMemberId,
        'MESSAGE',
        chatRoom._id.toString()
    )

    log(`Thành viên ${newMemberId} đã được thêm vào phòng chat ${chatRoom.name}`)

    return chatRoom
}

export default addMember
