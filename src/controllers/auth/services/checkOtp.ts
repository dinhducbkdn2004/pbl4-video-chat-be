import userModel from "../../../models/user.model";

const checkOtp = async (
    otp: string,
    email: string
): Promise<{ accessToken: string; refreshToken: string }> => {
    const user = await userModel.findOne({ email });
    if (!user) throw "Không tồn tại email!";
    if (user.account.otp !== otp) {
    }
    // tiếp tục =))))
};
export default checkOtp;
