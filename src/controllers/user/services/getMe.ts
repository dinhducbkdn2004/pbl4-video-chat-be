import userModel from "../../../models/user.model";

const getMe = async (userId: string) => {
    const user = await userModel.findById(userId).select("-account");
    if (!user) throw "User not found!";
    return user;
};
export default getMe;