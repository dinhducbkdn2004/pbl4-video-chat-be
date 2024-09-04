import userModel from "../../../models/user.model";
import { generateAccessToken } from "../../../helpers/jwtToken";
import { generateRefreshToken } from "../../../helpers/jwtToken";

const checkOtp = async (
    otp: string,
    email: string
): Promise<{ accessToken: string; refreshToken: string }> => {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("Không tồn tại email!");

    if (user.account.otp !== otp) {
        throw new Error("OTP không hợp lệ!");
    }

    if (user.account.otpExp < new Date()) {
        throw new Error("OTP đã hết hạn!");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.account.isVerified = true;

    await user.save();

    return { accessToken, refreshToken };
};

export default checkOtp;
