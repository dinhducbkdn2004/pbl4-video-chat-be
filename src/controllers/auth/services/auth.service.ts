import changePassword from "./changePassword";
import checkOtp from "./checkOtp";
import forgotPassword  from "./forgotPassword";
import  login  from "./login";
import loginByGoogle from "./loginByGoogle";
import register  from "./register";
import resetToken from "./resetToken";
import sendOtp from "./sendOtp";

const authService = {
    register,
    login,
    resetToken,
    checkOtp,
    changePassword,
    forgotPassword,
    loginByGoogle,
    sendOtp,
};
export default authService;
