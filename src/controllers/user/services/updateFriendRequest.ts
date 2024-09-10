import mongoose from "mongoose";
import friendRequestModel from "../../../models/friendRequest.model";
import userModel from "../../../models/user.model";

const updateFriendRequest = async (
  senderId: string,
  receiverId: string,
  status: "ACCEPTED" | "DECLINED"
) => {
  if (senderId === receiverId) throw "Không thể kết bạn với chính bạn";

  const senderUser = await userModel.findById(senderId);
  const receiverUser = await userModel.findById(receiverId);

  if (senderUser === null || receiverUser === null)
    throw "Sender or Receiver does not exist";

  const newRequest = await friendRequestModel.findOneAndUpdate(
    {
      sender: senderId,
      receiver: receiverId,
    },
    {
      status,
    },
    { new: true } // This option returns the updated document
  );

  if (newRequest === null) throw "Không tồn tại request để update !";

  if (status === "ACCEPTED") {
    senderUser.friends.push(new mongoose.Types.ObjectId(receiverId));
    receiverUser.friends.push(new mongoose.Types.ObjectId(senderId));
    await senderUser.save();
    await receiverUser.save();
  }

  const data = await friendRequestModel
    .findOne({
      sender: senderId,
      receiver: receiverId,
      status,
    })
    .populate("sender", "-account") // Populate sender details
    .populate("receiver", "-account");
  console.log(data);

  if (data === null) throw "Không tồi tại request để get";
  return data;
};
export default updateFriendRequest;
