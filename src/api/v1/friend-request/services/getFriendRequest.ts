import { getPagination } from '~/helpers/pagination'
import friendRequestModel from '../friendRequest.model'

const getFriendRequests = async (userId: string, page: number = 1, limit: number = 10) => {
    const pagination = getPagination(page, limit)
    const friendRequests = await friendRequestModel
        .find({
            $or: [{ receiver: userId }],
            status: 'PENDING'
        })
        .populate('sender', '_id name avatar') // Populate sender details
        .populate('receiver', '_id name avatar') // Populate receiver details
        .skip(pagination.skip)
        .limit(pagination.limit)
        .sort({
            createdAt: -1
        })
    return friendRequests
}
export default getFriendRequests
