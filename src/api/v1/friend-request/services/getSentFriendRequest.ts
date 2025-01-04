import userModel from '../../user/user.model'
import friendRequestModel from '../friendRequest.model'

const getSentRequest = async (userId: string) => {
    const request = await friendRequestModel
        .find({
            sender: userId,
            status: 'PENDING'
        })
        .populate('receiver', 'name avatar')
    return request
}
export default getSentRequest
