import friendRequestModel from "../../../models/friendRequest.model";

const sendAddFriendRequest = async (senderId: string, receiverId: string) => {
    await friendRequestModel.create({
        sender: senderId,
        receiver: receiverId,
        status: "PENDING",
    });
    const newRequest = await friendRequestModel
        .findOne({
            sender: senderId,
            receiver: receiverId,
            status: "PENDING",
        })
        .populate("sender", "-account") // Populate sender details
        .populate("receiver", "-account");
    return newRequest;
};
export default sendAddFriendRequest;
