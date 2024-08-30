import changePassword from "./changePassword";
import checkOtp from "./checkOtp";
import forgotPassword  from "./forgotPassword";
import  login  from "./login";
import loginByGoogle from "./loginByGoogle";
import register  from "./register";
import resetToken from "./resetToken";

const authService = {
    register,
    login,
    resetToken,
    checkOtp,
    changePassword,
    forgotPassword,
    loginByGoogle,
};
export default authService;
