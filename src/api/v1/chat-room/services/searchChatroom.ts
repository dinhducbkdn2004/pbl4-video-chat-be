import { getPagination } from '../../../../helpers/pagination'
import chatRoomModel from '../chatRoom.model'

const searchChatRooms = async (
    name?: string,
    page: number = 1,
    limit: number = 10,
    type?: 'PUBLIC' | 'PRIVATE',
    getMy?: boolean,
    userId?: string
) => {
    const pagination = getPagination(page, limit)

    type SearchOption = {
        name?: RegExp
        typeRoom?: 'PUBLIC' | 'PRIVATE'
        participants?: string
        $or?: any[]
    }

    const searchOption: SearchOption = {}
    if (name) {
        searchOption.name = new RegExp(name, 'i')
    }
    if (type === 'PRIVATE') {
        searchOption.typeRoom = 'PRIVATE'
        searchOption.participants = userId
    } else if (type === 'PUBLIC') {
        searchOption.typeRoom = 'PUBLIC'
    }
    if (getMy) {
        searchOption.$or = [{ typeRoom: 'PUBLIC' }, { typeRoom: 'PRIVATE', participants: userId }]
    }

    const chatRooms = await chatRoomModel
        .find(searchOption)
        .select('name isGroupChat participants updatedAt')
        .populate('participants', 'name avatar')
        .sort({ updatedAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit)

    return chatRooms
}

export default searchChatRooms
