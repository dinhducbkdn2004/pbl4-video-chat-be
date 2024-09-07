import changePassword from "./changePassword";
import checkOtp from "./checkOtp";
import forgotPassword from "./forgotPassword";
import login from "./login";
import loginByGoogle from "./loginByGoogle";
import register from "./register";
import resetPassword from "./resetPassword";
import resetToken from "./resetToken";
import searchUsersAndGroups from "../../search/services/search";
import sendOtp from "./sendOtp";

const authService = {
  searchUsersAndGroups,
  register,
  login,
  resetToken,
  checkOtp,
  changePassword,
  resetPassword,
  forgotPassword,
  loginByGoogle,
  sendOtp,
};
export default authService;
