import { Request, Response } from "express";

import responseHandler from "../../handlers/response.handler";
import generateRandomNumberString from "../../helpers/generateRandomNumberString";
import { hashPassword } from "../../helpers/hashPassword";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../helpers/jwtToken";
import sendMail from "../../helpers/sendMail";
import userModel from "../../models/user.model";
interface CheckOtpBody {
    otp: string;
}
export const checkOtp = async (
    req: Request<{}, {}, CheckOtpBody>,
    res: Response
) => {
    try {
        const { otp } = req.body;
        const { userId } = (req as any).user;

        const user = await userModel.findById(userId);
        if (!user) return responseHandler.unauthenticate(res);
        if (user.account.otp !== otp)
            return responseHandler.badRequest(res, "Wrong otp");
        // tiếp tục =))))
        responseHandler.ok(
            res,
            {
                accessToken: generateAccessToken(user._id),
                refreshToken: generateRefreshToken(user._id),
            },
            "Xác thực tài khoản thành công!"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
