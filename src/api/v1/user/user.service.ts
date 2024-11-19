import sendAddFriendRequest from '../friend-request/services/addFriendRequest'
import editProfile from './services/editProfile'
import getFriendList from './services/getFriendList'
import getFriendRequests from '../friend-request/services/getFriendRequest'
import getUser, { getAllUsers } from './services/getUser'

import updateFriendRequest from '../friend-request/services/updateFriendRequest'
import searchUsers from './services/searchUsers'
import { getOnlineFriends } from './services/getOnlineFriend'
import userModel from './user.model'

const userService = {
    searchUsers,
    editProfile,
    getOnlineFriends,
    getUser,

    getAllUsers,
    getFriendList,
    getUserProfile: async function ({ userId, authId }: { userId: string; authId: string }) {
        const user = await userModel.findById(userId).select('-account -notifications -chatRooms ').lean()
        if (!user) throw 'User not found!'
        const result = { ...user, isFriend: user.friends.some((friend) => friend._id.equals(authId)) }

        return result
    },
    removeFriend: async function (userId: string, friendId: string) {
        const user = await userModel.findById(userId)
        if (!user) throw 'User not found!'
        const friend = await userModel.findById(friendId)
        if (!friend) throw 'Friend not found!'

        await userModel.updateOne({ _id: userId }, { $pull: { friends: friendId } })
        await userModel.updateOne({ _id: friendId }, { $pull: { friends: userId } })
        return { status: 'success' }
    }
}
export default userService
