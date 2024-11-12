import chatRoomModel, { TypeRoom } from '../chatRoom.model'
import { getPagination } from '../../../../helpers/pagination'
import { IUser } from '../../user/user.model'
import messageModel, { IMessage } from '../../message/message.model'
import { validation } from '~/helpers/validation'

const searchChatRooms = async (
    name?: string,
    page: number = 1,
    limit: number = 10,
    privacy?: 'PUBLIC' | 'PRIVATE',
    getMy?: boolean,
    userId?: string,
    typeRoom?: TypeRoom
) => {
    const pagination = getPagination(page, limit)

    type SearchOption = {
        name?: RegExp
        privacy?: 'PUBLIC' | 'PRIVATE'
        participants?: string
        $or?: any[]
        email?: string
        typeRoom?: TypeRoom
    }

    const searchOption: SearchOption = {}
    if (typeRoom) {
        searchOption.typeRoom = typeRoom
    }
    if (name) {
        searchOption.$or = [
            { name: new RegExp(name, 'i') }, // Match chat room name
            { 'participants.name': new RegExp(name, 'i') } // Match participant name
        ]
    }
    if (privacy === 'PRIVATE') {
        searchOption.privacy = 'PRIVATE'
        searchOption.participants = userId
    } else if (privacy === 'PUBLIC') {
        searchOption.privacy = 'PUBLIC'
    }
    if (getMy && userId) {
        // Khi `getMy` là true, lấy các phòng OneToOne và Group mà userId tham gia, bất kể privacy
        searchOption.$or = [
            { typeRoom: 'OneToOne', participants: userId },
            { typeRoom: 'Group', participants: userId }
        ]
    }

    const chatRooms = await chatRoomModel
        .find(searchOption)
        .select('name typeRoom chatRoomImage participants admins moderators updatedAt lastMessage')
        .populate<{ admins: IUser[] }>('admins', 'name avatar')
        .populate<{ moderators: IUser[] }>('moderators', 'name avatar')
        .populate<{ participants: IUser[] }>('participants', 'name avatar')
        .populate<{ lastMessage: IMessage[] }>({
            path: 'lastMessage',
            select: '_id sender content type createdAt updatedAt',
            populate: {
                path: 'sender',
                select: 'name avatar'
            }
        })
        .sort({ updatedAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean()

    const updatedChatRooms = await Promise.all(
        chatRooms.map(async (room) => {
            if (room.typeRoom === 'OneToOne' && userId) {
                const opponent = room.participants.find((participant) => participant._id.toString() !== userId)

                if (opponent) {
                    room.name = opponent.name || room.name
                    room.chatRoomImage = opponent.avatar || room.chatRoomImage

                    await chatRoomModel.updateOne(
                        { _id: room._id },
                        { $set: { name: room.name, chatRoomImage: room.chatRoomImage } }
                    )
                }
            }
            return room
        })
    )

    return updatedChatRooms
}

export default searchChatRooms
