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

    if (newName && newName.trim() !== '') {
        chatRoom.name = newName
    }

    if (newImage && newImage.trim() !== '') {
        chatRoom.chatRoomImage = newImage
    }
    await chatRoom.save()

    return chatRoom
}

export default changeDetails
