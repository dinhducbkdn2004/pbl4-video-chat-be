import userModel from "../../../models/user.model";

 const forgotPassword = async (email: string) => {
    const user = await userModel.findOne({ email });
    if (!user) throw "User not found!";
    // tiếp tục =))))
};
export default forgotPassword;
