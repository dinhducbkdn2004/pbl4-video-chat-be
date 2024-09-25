import { notificationService } from '../../notifications/notification.service'
import chatRoomModel from '../chatRoom.model'

const createChatRoom = async (
    createdBy: string,
    paticipants: string[],
    name: string,
    privacy: 'PUBLIC' | 'PRIVATE'
) => {
    paticipants.push(createdBy)
    const room = await chatRoomModel.create({
        createdBy,
        name,
        participants: paticipants,
        privacy,
        typeRoom: paticipants.length === 2 ? 'OneToOne' : 'Group'
    })
    paticipants.forEach(
        async (user_id: string) =>
            await notificationService.createNotification(
                `Bạn đã được thêm vào phòng chat ${name}`,
                user_id,
                'MESSAGE',
                room._id.toString()
            )
    )
    return room
}
export default createChatRoom
