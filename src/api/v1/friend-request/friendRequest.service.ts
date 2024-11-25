import sendAddFriendRequest from './services/addFriendRequest'
import getFriendRequests from './services/getFriendRequest'
import revokeFriendRequest from './services/revokeFriendRequests'
import updateFriendRequest from './services/updateFriendRequest'

const friendRequestService = {
    sendAddFriendRequest,
    getFriendRequests,
    updateFriendRequest,
    revokeFriendRequest
}
export default friendRequestService
