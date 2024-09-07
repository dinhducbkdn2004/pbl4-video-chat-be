import changePassword from "./changePassword";
import checkOtp from "./checkOtp";
import forgotPassword from "./forgotPassword";
import getFriends from "./friend";
import login from "./login";
import loginByGoogle from "./loginByGoogle";
import register from "./register";
import resetPassword from "./resetPassword";
import resetToken from "./resetToken";
import searchUsersAndGroups from "./search";
import sendOtp from "./sendOtp";

const authService = {
  searchUsersAndGroups,
  getFriends,
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
