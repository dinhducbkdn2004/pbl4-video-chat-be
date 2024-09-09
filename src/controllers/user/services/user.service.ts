import sendAddFriendRequest from "./addFriendRequest";
import getFriendList from "./getFriendList";
import getFriendRequests from "./getFriendRequest";
import getUser, { getAllUsers } from "./getUser";

import updateFriendRequest from "./updateFriendRequest";

const userService = {
    getFriendRequests,
    getUser,
    sendAddFriendRequest,
    updateFriendRequest,
    getAllUsers,
    getFriendList,
};
export default userService;
