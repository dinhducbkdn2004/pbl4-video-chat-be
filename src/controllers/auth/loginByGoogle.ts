import { Request, Response } from "express";
import googleAuth from "../../helpers/googleAuth";
import responseHandler from "../../handlers/response.handler";
import userModel from "../../models/user.model";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../helpers/jwtToken";
interface LoginByGoogleBody {
    credential: string;
}
const loginByGoogle = async (
    req: Request<{}, {}, LoginByGoogleBody>,
    res: Response
) => {
    try {
        const { credential } = req.body;
        const data = await googleAuth(credential);
        if (!data)
            return responseHandler.badRequest(
                res,
                "Không thể đăng nhập bằng google"
            );
        const user = await userModel.findOne({ email: data.email });
        if (user)
            return responseHandler.ok(
                res,
                {
                    accessToken: generateAccessToken({ userId: user._id }),
                    refreshToken: generateRefreshToken({ userId: user._id }),
                },
                "Đăng nhập thành công!"
            );
        else {
        }
        const newUser = await userModel.create({
            email: data.email,
            name: data.name,
            avatar: data.picture,
            account: {
                loginType: "GOOGLE",
                isVerified: true,
            },
        });
        return responseHandler.ok(
            res,
            {
                accessToken: generateAccessToken({ userId: newUser._id }),
                refreshToken: generateRefreshToken({ userId: newUser._id }),
            },
            "Đăng nhập thành công!"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};

export default loginByGoogle;
