import { comparePassword } from "../../../helpers/hashPassword";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../../helpers/jwtToken";
import userModel from "../../../models/user.model";
import authService from "./auth.service";

const login = async (
    email: string,
    password: string
): Promise<{
    accessToken: string;
    refreshToken: string;
}> => {
    const user = await userModel.findOne({
        email,
    });

    if (user === null) throw "Not found your account!";

    if (user.account.isVerified === false) {
        await authService.sendOtp(user._id.toString());
        throw `Your account hasn't been verified. We has send otp to email: ${user.email}. Please use this otp to verify your accout!`;
    }

    if (!user.account.password)
        throw "Phải đăng nhập bằng google và đổi lại mật khẩu!";

    if ((await comparePassword(password, user.account.password)) === false)
        throw "Wrong password!";

    const accessToken = generateAccessToken({ userId: user._id });
    const refreshToken = generateRefreshToken({ userId: user._id });

    return {
        accessToken,
        refreshToken,
    };
};
export default login;
