import chatRoomModel from '../chatRoom.model'
import { getPagination } from '../../../../helpers/pagination'
import { IUser } from '../../user/user.model'
import messageModel, { IMessage } from '../../message/message.model'

const searchChatRooms = async (
    name?: string,
    page: number = 1,
    limit: number = 10,
    privacy?: 'PUBLIC' | 'PRIVATE',
    getMy?: boolean,
    userId?: string
) => {
    const pagination = getPagination(page, limit)

    type SearchOption = {
        name?: RegExp
        privacy?: 'PUBLIC' | 'PRIVATE'
        participants?: string
        $or?: any[]
    }

    const searchOption: SearchOption = {}
    if (name) {
        searchOption.name = new RegExp(name, 'i')
    }
    if (privacy === 'PRIVATE') {
        searchOption.privacy = 'PRIVATE'
        searchOption.participants = userId
    } else if (privacy === 'PUBLIC') {
        searchOption.privacy = 'PUBLIC'
    }
    if (getMy) {
        searchOption.$or = [{ privacy: 'PUBLIC' }, { privacy: 'PRIVATE', participants: userId }]
    }

    const chatRooms = await chatRoomModel
        .find(searchOption)
        .select('name typeRoom participants updatedAt lastMessage')
        .populate<{ participants: IUser[] }>('participants', 'name avatar')
        .populate<{ lastMessage: IMessage[] }>({
            path: 'lastMessage', // Populate lastMessage first
            select: '_id sender content type createdAt updatedAt', // Select fields in lastMessage
            populate: {
                path: 'sender', // Nested populate for sender
                select: 'name avatar' // Select fields from the sender (user model)
            }
        })
        .sort({ updatedAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean()

    const updatedChatRooms = chatRooms.map((room) => {
        if (room.typeRoom === 'OneToOne') {
            // Find the other participant (opponent)
            const opponent = room.participants.find((participant) => participant._id.toString() !== userId)
            room.name = opponent?.name || ''
            room.chatRoomImage = opponent?.avatar || ''
            room.isOnline = opponent?.isOnline || false
        }

        return room
    })
    console.log(updatedChatRooms)

    return updatedChatRooms
}

export default searchChatRooms
