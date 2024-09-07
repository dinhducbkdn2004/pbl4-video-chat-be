import userModel from "../../../models/user.model";

const getUser = async (userId: string) => {
    const user = await userModel.findById(userId).select("-account");

    if (!user) throw "User not found!";
    return user;
};
export default getUser;
