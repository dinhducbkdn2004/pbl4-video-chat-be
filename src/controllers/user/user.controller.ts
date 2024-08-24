import { Request, Response } from "express";
import responseHandler from "../../handlers/response.handler";
import User from "../../models/user.model";

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        const queryUser = await User.findById(user.userId).select("-account");

        if (!queryUser)
            return responseHandler.badRequest(res, "User not found!");

        responseHandler.ok(
            res,
            queryUser,
            `Hello ${queryUser.name}, welcome back!`
        );
    } catch (error: any) {
        responseHandler.error(res, error);
    }
};
