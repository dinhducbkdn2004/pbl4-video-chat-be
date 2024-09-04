import sendAddFriendRequest from "./addFriendRequest";
import getFriendRequests from "./getFriendRequest";
import getMe from "./getMe";
import updateFriendRequest from "./updateFriendRequest";

const userService = {
    getFriendRequests,
    getMe,
    sendAddFriendRequest,
    updateFriendRequest,
};
export default userService;
