import userModel from '../user.model'

const getFriendList = async (userId: string) => {
    const user = await userModel.findById(userId).select('friends').populate('friends', '_id name avatar email')
    return user?.friends || []
}
export default getFriendList
