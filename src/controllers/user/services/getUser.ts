import userModel from "../../../models/user.model";

const getUser = async (userId?: string) => {
    let user;

    if (!userId) {
        user = await userModel.find().select("-account"); // Lấy tất cả các user
    } else {
        user = await userModel.findById(userId).select("-account"); // Lấy user theo ID
    }

    if (!user) throw "User not found!";
    return user;
};

export default getUser;
