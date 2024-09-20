import sendAddFriendRequest from '../friend-request/services/addFriendRequest'
import editProfile from './services/editProfile'
import getFriendList from './services/getFriendList'
import getFriendRequests from '../friend-request/services/getFriendRequest'
import getUser, { getAllUsers } from './services/getUser'

import updateFriendRequest from '../friend-request/services/updateFriendRequest'
import searchUsers from './services/searchUsers'

const userService = {
    searchUsers,
    editProfile,

    getUser,

    getAllUsers,
    getFriendList
}
export default userService
