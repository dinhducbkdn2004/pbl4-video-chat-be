import userModel from '../../user/user.model'

const getSentRequest = async (userId: string) => {
    const user = await userModel
        .findById(userId)
        .select('sentRequests')
        .populate('sentRequests', 'name avatar introduction')
    if (!user || !user.sentRequests.length) {
        throw new Error('Không tìm thấy lời mời')
    }
    return user.sentRequests
}
export default getSentRequest
