import userModel from "../../../models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../helpers/jwtToken";

const MAX_OTP_ATTEMPTS = 5;
const LOCK_TIME = 5 * 60 * 1000;

const checkOtp = async (
  otp: string,
  email: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("Không tồn tại email!");

  if (user.account.otpLockUntil && user.account.otpLockUntil > new Date()) {
    throw new Error(
      "Bạn đã nhập sai OTP quá nhiều lần. Vui lòng thử lại sau 5 phút."
    );
  }

  if (user.account.otp !== otp) {
    user.account.otpAttempts += 1;

    if (user.account.otpAttempts >= MAX_OTP_ATTEMPTS) {
      user.account.otpLockUntil = new Date(Date.now() + LOCK_TIME);
      await user.save();
      throw new Error(
        "Bạn đã nhập sai OTP quá nhiều lần. Tài khoản bị khóa trong 5 phút."
      );
    }

    await user.save();
    throw new Error(
      `OTP không hợp lệ! Bạn còn ${
        MAX_OTP_ATTEMPTS - user.account.otpAttempts
      } lần thử.`
    );
  }

  if (user.account.otpExp < new Date()) {
    throw new Error("OTP đã hết hạn!");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.account.isVerified = true;
  user.account.otpAttempts = 0;
  user.account.otpLockUntil = undefined;
  await user.save();

  return { accessToken, refreshToken };
};

export default checkOtp;
