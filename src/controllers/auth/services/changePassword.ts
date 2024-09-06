import { Request, Response } from "express";
import userModel from "../../../models/user.model";
import { hashPassword } from "../../../helpers/hashPassword";

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

const changePassword = async (
  newPassword: string,
  userId: string
): Promise<ChangePasswordResponse> => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return { success: false, message: "Người dùng không tồn tại!" };
    }

    const hashedPassword = await hashPassword(newPassword);

    user.account.password = hashedPassword;
    await user.save();

    return { success: true, message: "Mật khẩu đã được thay đổi thành công!" };
  } catch (error) {
    return { success: false, message: `Có lỗi xảy ra: ${error}` };
  }
};

export default changePassword;
