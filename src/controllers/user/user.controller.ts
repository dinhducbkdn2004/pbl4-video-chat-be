import { Request, Response } from "express";
import responseHandler from "../../handlers/response.handler";

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        responseHandler.ok(res, user, `Hello ${user.name}, welcome back!`);
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
