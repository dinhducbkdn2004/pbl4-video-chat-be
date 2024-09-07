import sendAddFriendRequest from "./addFriendRequest";
import getFriendRequests from "./getFriendRequest";
import getUser from "./getUser";

import updateFriendRequest from "./updateFriendRequest";

const userService = {
    getFriendRequests,
    getUser,
    sendAddFriendRequest,
    updateFriendRequest,
    
};
export default userService;
