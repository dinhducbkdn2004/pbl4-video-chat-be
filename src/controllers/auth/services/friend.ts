import userModel from "../../../models/user.model";

const getFriends = async (userId: string) => {
  const user = await userModel
    .findById(userId)
    .populate("account.friends", "name email");
  if (!user) throw new Error("Người dùng không tồn tại!");

  return user.friends;
};

export default getFriends;
