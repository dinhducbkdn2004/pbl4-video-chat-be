import sendAddFriendRequest from './addFriendRequest';
import editProfile from './editProfile';
import getFriendList from './getFriendList';
import getFriendRequests from './getFriendRequest';
import getUser, { getAllUsers } from './getUser';

import updateFriendRequest from './updateFriendRequest';

const userService = {
    editProfile,
    getFriendRequests,
    getUser,
    sendAddFriendRequest,
    updateFriendRequest,
    getAllUsers,
    getFriendList
};
export default userService;
