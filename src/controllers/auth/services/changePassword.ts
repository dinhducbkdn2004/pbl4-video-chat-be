import { Request, Response } from "express";
import userModel from "../../../models/user.model";
import { hashPassword } from "../../../helpers/hashPassword";

const changePassword = async (newPassword: string, userId: string) => {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new Error("User not found!");
  }

  const hashedPassword = await hashPassword(newPassword);

  user.account.password = hashedPassword;
  await user.save();
};
export default changePassword;
