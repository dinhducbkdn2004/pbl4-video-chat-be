import OtpForm from "../../../constants/OtpForm";
import generateRandomNumberString from "../../../helpers/generateRandomNumberString";
import sendMail from "../../../helpers/sendMail";
import userModel from "../../../models/user.model";

const sendOtp = async (userId: string) => {
    const user = await userModel.findById(userId);
    if (!user) throw "User not found";

    const otp = generateRandomNumberString(6);

    sendMail([user.email], "Mã xác thực tài khoản", OtpForm(otp));

    user.account.otp = otp;
    user.account.otpExp = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();
};
export default sendOtp;
