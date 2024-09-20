import { Request, Response } from 'express'
import userModel from '../../user/user.model'
import { hashPassword } from '../../../../helpers/hashPassword'

const changePassword = async (newPassword: string, userId: string): Promise<string> => {
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return 'Người dùng không tồn tại!'
        }

        const hashedPassword = await hashPassword(newPassword)

        user.account.password = hashedPassword
        await user.save()

        return 'Mật khẩu đã được thay đổi thành công!'
    } catch (error) {
        return `Có lỗi xảy ra: ${error}`
    }
}

export default changePassword
