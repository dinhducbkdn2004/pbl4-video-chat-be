import { Request, Response } from "express";
import responseHandler from "../../handlers/response.handler";

export const getMe = async (req: Request, res: Response) => {
    try {
        responseHandler.ok(res, (req as any).user, "Thông tin tài khoản");
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
