import { Request, Response } from "express";

import responseHandler from "../../handlers/response.handler";
import generateRandomNumberString from "../../helpers/generateRandomNumberString";
import { hashPassword } from "../../helpers/hashPassword";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../helpers/jwtToken";
import sendMail from "../../helpers/sendMail";
import User from "../../models/user.model";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };
        const user = await User.findOne({
            email: email,
        });

        if (user === null)
            return responseHandler.badRequest(res, "Not found your account!");

        // if (user.account.isVerified === false)
        //     return responseHandler.badRequest(
        //         res,
        //         "Please verify your account!"
        //     );

        // if ((await comparePassword(password, user.account.password)) === false)
        //     return responseHandler.notFound(res, "Wrong password!");

        responseHandler.ok(
            res,
            {
                accessToken: generateAccessToken(user._id),
            },
            "Đăng nhập thành công"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body as {
            email: string;
            password: string;
            name: string;
        };

        const otp = generateRandomNumberString(6);

        const user = await User.create({
            name,
            email,
            account: {
                password: hashPassword(password),
                isVerified: false,
                otp: otp,
                otpExp: new Date(Date.now() + 5 * 60 * 1000),
            },
        });

        sendMail([email], "Mã xác thực tài khoản", otp);

        responseHandler.created(
            res,
            {
                accessToken: generateAccessToken(user._id),
                refreshToken: generateRefreshToken(user._id),
            },
            "Đăng ký thành công, hãy xác thực tài khoản"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
