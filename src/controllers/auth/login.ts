import { Request, Response } from "express";

import responseHandler from "../../handlers/response.handler";
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
        const accessToken = generateAccessToken({ userId: user._id });
        const refreshToken = generateRefreshToken({ userId: user._id });

        responseHandler.ok(
            res,
            { accessToken, refreshToken },
            "Login successful"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
