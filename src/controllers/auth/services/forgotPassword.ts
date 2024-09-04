import userModel from "../../../models/user.model";
import generateRandomNumberString from "../../../helpers/generateRandomNumberString";
import sendMail from "../../../helpers/sendMail";
import OtpForm from "../../../constants/OtpForm";

const forgotPassword = async (email: string): Promise<void> => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found!");

  const otp = generateRandomNumberString(6);
  const otpExp = new Date(Date.now() + 15 * 60 * 1000);

  user.account.otp = otp;
  user.account.otpExp = otpExp;
  await user.save();

  sendMail([email], "Mã xác thực đổi mật khẩu", OtpForm(otp));
};

export default forgotPassword;
