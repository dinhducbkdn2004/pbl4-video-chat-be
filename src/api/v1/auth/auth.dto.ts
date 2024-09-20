export interface LoginBody {
    email: string
    password: string
}
export interface ChangePasswordBody {
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
export interface ChangePasswordBody {
    email: string
}
export interface ResetPasswordBody {
    email: string
    otp: string
    newPassword: string
    confirmPassword: string
}
