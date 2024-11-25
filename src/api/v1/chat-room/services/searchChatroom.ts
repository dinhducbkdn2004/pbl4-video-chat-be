import chatRoomModel, { TypeRoom } from '../chatRoom.model'
import { getPagination } from '../../../../helpers/pagination'
import { IUser } from '../../user/user.model'
import messageModel, { IMessage } from '../../message/message.model'
import { validation } from '~/helpers/validation'
import path from 'path'
import userModel from '../../user/user.model'

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

    if (name) {
        const users = await userModel
            .find({ name: new RegExp(name as string, 'i') })
            .select('_id')
            .lean()
        const userIds = users.map((user) => user._id)
        searchOption.$or = [{ name: new RegExp(name, 'i') }, { participants: { $in: userIds } }]
    }

    if (privacy === 'PRIVATE') {
        searchOption.privacy = 'PRIVATE'
        searchOption.participants = userId
    } else if (privacy === 'PUBLIC') {
        searchOption.privacy = 'PUBLIC'
    }
    if (getMy === true) {
        searchOption.participants = userId
    }
    if (typeRoom) {
        searchOption.typeRoom = typeRoom
    }

    const chatRooms = await chatRoomModel
        .find(searchOption)
        .select('name typeRoom chatRoomImage participants admins moderators updatedAt lastMessage')
        .populate<{ participants: IUser[] }>('participants', 'name avatar')
        .populate<{ admins: IUser[] }>('admins', 'name avatar')
        .populate<{ moderators: IUser[] }>('moderators', 'name avatar')
        .populate<{ lastMessage: IMessage[] }>({
            path: 'lastMessage',
            select: '_id sender content type isRead createdAt updatedAt',
            populate: [
                {
                    path: 'sender',
                    select: 'name avatar'
                },
                {
                    path: 'isRead',
                    select: 'name avatar'
                }
            ]
        })
        .sort({ updatedAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean()

    return chatRooms
}

export default searchChatRooms
