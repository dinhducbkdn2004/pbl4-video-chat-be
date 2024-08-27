import { Request, Response } from "express";

import responseHandler from "../../handlers/response.handler";
import userModel from "../../models/user.model";
interface ChangePasswordBody {
    email: string;
}
export const forgotPassword = async (
    req: Request<{}, {}, ChangePasswordBody>,
    res: Response
) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) return responseHandler.badRequest(res, "User not found!");
        // tiếp tục =))))
        responseHandler.ok(
            res,
            {},
            `Hệ thống đã gửi mã OTP đến tài khoản ${email}. Hãy xác thực tài khoản bằng mã OTP đó!`
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
