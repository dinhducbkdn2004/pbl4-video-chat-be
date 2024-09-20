import changePassword from './services/changePassword'
import checkOtp from './services/checkOtp'
import forgotPassword from './services/forgotPassword'
import login from './services/login'
import loginByGoogle from './services/loginByGoogle'
import register from './services/register'
import resetPassword from './services/resetPassword'
import resetToken from './services/resetToken'

import sendOtp from './services/sendOtp'

const authService = {
    register,
    login,
    resetToken,
    checkOtp,
    changePassword,
    resetPassword,
    forgotPassword,
    loginByGoogle,
    sendOtp
}
export default authService
