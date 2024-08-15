import { Request, Response } from "express";

import Account from "../../models/account.model";
import User from "../../models/user.model";
import sendMail from "../../helpers/sendMail";
import { generateToken } from "../../helpers/jwtToken";
import { comparePassword, hashPassword } from "../../helpers/hashPassword";
import generateRandomNumberString from "../../helpers/generateRandomNumberString";
import responseHandler from "../../handlers/response.handler";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };
        const account = await Account.findOne({
            email: email,
        });

        if (account === null)
            return responseHandler.badRequest(res, "Not found your account!");

        // if (account.isVerified === false)
        //     return responseHandler.badRequest(
        //         res,
        //         "Please verify your account!"
        //     );

        // if ((await comparePassword(password, account.password)) === false)
        //     return responseHandler.notFound(res, "Wrong password!");

        responseHandler.ok(
            res,
            {
                accessToken: generateToken(account.userId),
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

        const user = await User.create({ email, name });
        const otp = generateRandomNumberString(6);
        const account = await Account.create({
            email,
            password: hashPassword(password),
            isVerified: false,
            userId: user.id,
            otp: otp,
            otpExp: new Date(Date.now() + 5 * 60 * 1000),
        });

        await sendMail([email], "Mã xác thực tài khoản", otp);
        responseHandler.created(
            res,
            {
                accessToken: generateToken(user.id),
            },
            "Đăng ký thành công, hãy xác thực tài khoản"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
