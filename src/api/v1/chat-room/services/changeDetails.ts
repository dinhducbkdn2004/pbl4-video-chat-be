import { notificationService } from '../../notifications/notification.service'
import chatRoomModel from '../chatRoom.model'
import { Types } from 'mongoose'

const changeDetails = async (chatRoomId: string, adminId: string, newName?: string, newImage?: string) => {
    const chatRoom = await chatRoomModel.findById(chatRoomId)
    if (!chatRoom) {
        throw new Error('Phòng chat không tồn tại.')
    }

    if (!chatRoom.admins.includes(new Types.ObjectId(adminId))) {
        throw new Error('Bạn không có quyền thực hiện hành động này.')
    }

    const remainingMembers = chatRoom.participants.filter((participant) => !participant.equals(adminId))

    if (newName && newName.trim() !== '') {
        chatRoom.name = newName
        await notificationService.createNotification(
            `Bạn đã thay đổi tên Group thành ${newName}`,
            adminId,
            'MESSAGE',
            chatRoomId
        )
        for (const member of remainingMembers) {
            await notificationService.createNotification(
                `Group đã được đổi tên thành ${newName}`,
                member.toString(),
                'MESSAGE',
                chatRoomId
            )
        }
    }

    if (newImage && newImage.trim() !== '') {
        chatRoom.chatRoomImage = newImage
        await notificationService.createNotification(`Bạn thay đổi ảnh Group`, adminId, 'MESSAGE', chatRoomId)
        for (const member of remainingMembers) {
            await notificationService.createNotification(
                `Ảnh Group đã được thay đổi`,
                member.toString(),
                'MESSAGE',
                chatRoomId
            )
        }
    }
    await chatRoom.save()

    return chatRoom
}

export default changeDetails
