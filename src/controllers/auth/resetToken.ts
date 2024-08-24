import { Request, Response } from "express";
import responseHandler from "../../handlers/response.handler";
import {
    generateAccessToken,
    verifyRefreshToken,
} from "../../helpers/jwtToken";

export default function resetToken(req: Request, res: Response) {
    try {
        const { refreshToken } = req.body as {
            refreshToken: string;
        };
        const decodeToken = verifyRefreshToken(refreshToken);

        const newAccessToken = generateAccessToken(
            typeof decodeToken === "string" ? decodeToken : decodeToken.data
        );
        responseHandler.ok(
            res,
            { accessToken: newAccessToken },
            "Đã tạo mới acccess Token"
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
}
