import chatRoomModel from '../../chatRoom.model'
import { Types } from 'mongoose'
import { notificationService } from '../../../notifications/notification.service'
import userModel from '~/api/v1/user/user.model'

const leaveGroup = async (chatRoomId: string, userId: string) => {
    const chatRoom = await chatRoomModel.findById(chatRoomId)
    if (!chatRoom || chatRoom.typeRoom !== 'Group') {
        throw new Error('Phòng chat không tồn tại hoặc không phải là Group!')
    }

    if (!chatRoom.participants.includes(new Types.ObjectId(userId))) {
        throw new Error('Bạn không nằm trong Groupchat!')
    }

    const user = await userModel.findById(userId)
    if (!user) {
        throw new Error('User không tồn tại!')
    }

    const isAdmin = chatRoom.admins.includes(new Types.ObjectId(userId))
    if (isAdmin && chatRoom.admins.length === 1) {
        throw new Error('Phải bổ nhiệm Admin khác cho Group trước khi rời nhóm!')
    }

    chatRoom.participants = chatRoom.participants.filter((participant) => !participant.equals(userId))
    await chatRoom.save()

    await notificationService.createNotification('Bạn đã rời khỏi cuộc trò chuyện', userId, 'ChatRooms', chatRoomId)

    const remainingMembers = chatRoom.participants
    const message = `Thành viên ${user.name} đã rời khỏi nhóm ${chatRoom.name}.`

    for (const member of remainingMembers) {
        await notificationService.createNotification(message, member.toString(), 'ChatRooms', chatRoomId)
    }

    return chatRoom
}

export default leaveGroup
