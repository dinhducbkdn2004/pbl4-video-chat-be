import { Request, Response } from "express";

import responseHandler from "../../handlers/response.handler";
import generateRandomNumberString from "../../helpers/generateRandomNumberString";
import { hashPassword } from "../../helpers/hashPassword";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../helpers/jwtToken";
import sendMail from "../../helpers/sendMail";

import userModel from "./../../models/user.model";

interface LoginBody {
    email: string;
    password: string;
}
export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({
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
                accessToken: generateAccessToken({ userId: user._id }),
                refreshToken: generateRefreshToken({ userId: user._id }),
            },
            "Đăng nhập thành công"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
