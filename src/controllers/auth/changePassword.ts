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
interface ChangePasswordBody {
    newPassword: string;
}
export const changePassword = async (
    req: Request<{}, {}, ChangePasswordBody>,
    res: Response
) => {
    try {
        const { newPassword } = req.body;
        const { userId } = (req as any).user;

        // tiếp tục =))))
        // responseHandler.ok(
        //     res,
        //     {
        //         accessToken: generateAccessToken(user._id),
        //         refreshToken: generateRefreshToken(user._id),
        //     },
        //     "Change password successfully!"
        // );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
