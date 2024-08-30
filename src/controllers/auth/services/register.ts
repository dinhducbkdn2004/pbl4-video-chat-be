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
    const otp = generateRandomNumberString(6);
    const checkUser = userModel.findOne({ email });
    if (checkUser !== null) throw "Mail already registered!";
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
    sendMail([email], "Mã xác thực tài khoản", otp);
    return email;
};
export default register;
