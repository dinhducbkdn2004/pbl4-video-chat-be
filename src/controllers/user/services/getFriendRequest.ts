import { getPagination } from "../../../helpers/pagination";
import friendRequestModel from "../../../models/friendRequest.model";

const getFriendRequests = async (
    userId: string,
    page: string = "0",
    limit: string = "10"
) => {
    const pagination = getPagination(+page, +limit);
    const friendRequests = await friendRequestModel
        .find({
            $or: [{ receiver: userId }],
        })
        .populate("sender", "-account") // Populate sender details
        .populate("receiver", "-account") // Populate receiver details
        .skip(pagination.skip)
        .limit(pagination.limit)
        .sort({
            createdAt: -1,
        });
    return friendRequests;
};
export default getFriendRequests;
