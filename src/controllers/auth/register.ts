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

interface RegisterBody {
    email: string;
    password: string;
    name: string;
}
export const register = async (
    req: Request<{}, {}, RegisterBody>,
    res: Response
) => {
    try {
        const { email, password, name } = req.body;

        const otp = generateRandomNumberString(6);

        await userModel.create({
            name,
            email,
            account: {
                password: await hashPassword(password),
                isVerified: false,
                otp: otp,
                otpExp: new Date(Date.now() + 5 * 60 * 1000),
                loginType: "SYSTEM",
            },
        });

        sendMail([email], "Mã xác thực tài khoản", otp);

        responseHandler.created(
            res,
            {
                email,
            },
            "Đăng ký thành công, hãy xác thực tài khoản"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
