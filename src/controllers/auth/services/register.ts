import OtpForm from "../../../constants/OtpForm";
import generateRandomNumberString from "../../../helpers/generateRandomNumberString";
import { hashPassword } from "../../../helpers/hashPassword";
import sendMail from "../../../helpers/sendMail";
import userModel from "../../../models/user.model";

interface RegisterResponse {
  success: boolean;
  message: string;
  email?: string;
}

const register = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<RegisterResponse> => {
  try {
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return {
        success: false,
        message: "Email đã được đăng ký!",
      };
    }

    const otp = generateRandomNumberString(6);
    await sendMail([email], "Mã xác thực tài khoản", OtpForm(otp));

    await userModel.create({
      name,
      email,
      account: {
        password: await hashPassword(password),
        isVerified: false,
        otp: otp,
        otpExp: new Date(Date.now() + 5 * 60 * 1000),
        loginType: "SYSTEM",
      },
    });

    return {
      success: true,
      message:
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
      email,
    };
    â;
  } catch (error) {
    return {
      success: false,
      message: `Có lỗi xảy ra trong quá trình đăng ký: ${error}`,
    };
  }
};

export default register;
