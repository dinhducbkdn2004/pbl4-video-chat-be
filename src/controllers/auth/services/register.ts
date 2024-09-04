import OtpForm from "../../../constants/OtpForm";
import generateRandomNumberString from "../../../helpers/generateRandomNumberString";
import { hashPassword } from "../../../helpers/hashPassword";
import sendMail from "../../../helpers/sendMail";
import userModel from "../../../models/user.model";

const register = async ({
    email,
    password,
    name,
}: {
    email: string;
    password: string;
    name: string;
}): Promise<string> => {
    const checkUser = await userModel.findOne({ email });
    if (checkUser) throw "User đã tồn tại";

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
    return email;
};

export default register;
