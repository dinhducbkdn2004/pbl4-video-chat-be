import userModel from "../../../models/user.model";
import { hashPassword } from "../../../helpers/hashPassword";

const resetPassword = async (
    email: string,
    otp: string,
    newPassword: string,
    confirmPassword: string
): Promise<void> => {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found!");

    const now = new Date();

    if (user.account.otp !== otp || user.account.otpExp < now) {
        throw new Error("Invalid or expired OTP!");
    }

    if (newPassword !== confirmPassword) {
        throw new Error("Mật khẩu không khớp!");
    }

    const hashedPassword = await hashPassword(newPassword);
    user.account.password = hashedPassword;
    await user.save();
};

export default resetPassword;
