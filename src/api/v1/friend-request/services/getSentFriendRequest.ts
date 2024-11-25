import userModel from '../../user/user.model'

const getSentRequest = async (userId: string) => {
    const sentRequest = await userModel
        .findById(userId)
        .select('sentRequests')
        .populate('sentRequests', 'name avatar introduction')
    if (!sentRequest || !sentRequest.sentRequests.length) {
        throw new Error('Không tìm thấy lời mời')
    }
    return sentRequest
}
export default getSentRequest
