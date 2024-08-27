import { changePassword } from "./changePassword";
import { checkOtp } from "./checkOtp";
import { forgotPassword } from "./forgotPassword";
import { login } from "./login";
import { register } from "./register";
import resetToken from "./resetToken";

const authController = {
    register,
    login,
    resetToken,
    checkOtp,
    changePassword,
    forgotPassword,
};
export default authController;
