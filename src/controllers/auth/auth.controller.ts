import { login } from "./login";
import { register } from "./register";
import resetToken from "./resetToken";

const authController = {
    register,
    login,
    resetToken,
};
export default authController;
