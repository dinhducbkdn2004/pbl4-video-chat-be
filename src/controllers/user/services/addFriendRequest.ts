import mongoose from "mongoose";
import friendRequestModel from "../../../models/friendRequest.model";
import userModel from "../../../models/user.model";

const sendAddFriendRequest = async (
    senderId: string,
    receiverId: string,
    caption: string
) => {
    if (senderId === receiverId)
        throw new Error("Không thể kết bạn với chính mình");
    
    const receiver = await userModel.findById(receiverId).select("friends");

    if (receiver?.friends.includes(new mongoose.Types.ObjectId(senderId)))
        throw new Error("Không thể kết bạn vì 2 người đã là bạn");

    await friendRequestModel.create({
        sender: senderId,
        receiver: receiverId,
        status: "PENDING",
        caption,
    });
    const newRequest = await friendRequestModel
        .findOne({
            sender: senderId,
            receiver: receiverId,
            status: "PENDING",
        })
        .populate("sender", "name avatar _id")
        .populate("receiver", "name avatar _id");

    return newRequest;
};
export default sendAddFriendRequest;
