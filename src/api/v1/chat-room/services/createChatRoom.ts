import { log } from 'console'
import { notificationService } from '../../notifications/notification.service'
import chatRoomModel from '../chatRoom.model'

const createChatRoom = async (
    createdBy: string,
    participants: string[],
    name: string,
    privacy: 'PUBLIC' | 'PRIVATE'
) => {
    participants.push(createdBy)
    const room = await chatRoomModel.create({
        createdBy,
        name,
        participants: participants,
        admins: participants.length > 2 ? [createdBy] : [],
        privacy,
        typeRoom: participants.length === 2 ? 'OneToOne' : 'Group'
    })

    participants.forEach(
        async (user_id: string) =>
            await notificationService.createNotification(
                `Bạn đã được thêm vào phòng chat ${name}`,
                user_id,
                'ChatRooms',
                room._id.toString()
            )
    )
    return room
}
export default createChatRoom
