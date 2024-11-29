import userModel from '../user.model'

export const getUser = async (userId: string) => {
    const user = await userModel.findById(userId).select('-account -notifications -chatRooms -friends')

    if (!user) throw 'User not found!'
    return user
}

export const getAllUsers = async (userId: string) => {
    const users = await userModel
        .find({ _id: { $ne: userId } }) // Loại trừ chính mình
        .select('-account -notifications -chatRooms -friends -socketId')
        .populate('sentRequests', 'name avatar')
        .populate('receivedRequests', 'name avatar')

    const currentUser = await userModel.findById(userId).select('friends sentRequests receivedRequests')
    if (!currentUser) {
        throw new Error('Người dùng không tồn tại')
    }

    const friendsSet = new Set(currentUser.friends.map((friend) => friend.toString()))
    const sentRequestsSet = new Set(currentUser.sentRequests.map((sent) => sent.toString()))
    const receivedRequestsSet = new Set(currentUser.receivedRequests.map((received) => received.toString()))

    const result = users.map((user) => ({
        ...user.toObject(),
        isFriend: friendsSet.has(user._id.toString()),
        isSentRequest: sentRequestsSet.has(user._id.toString()),
        isReceivedRequest: receivedRequestsSet.has(user._id.toString())
    }))

    return result
}
