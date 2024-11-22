export interface LoginBody {
    email: string
    password: string
}
export interface ChangePasswordBody {
    oldPassword: string
    newPassword: string
}
export interface RegisterBody {
    email: string
    password: string
    name: string
}
export interface ResetTokenBody {
    refreshToken: string
}
export interface CheckOtpBody {
    email: string
    otp: string
}
export interface LoginByGoogleBody {
    credential: string
}
export interface ForgotPasswordBody {
    email: string
}
export interface ResetPasswordBody {
    email: string
    otp: string
    newPassword: string
    confirmPassword: string
}
