import { Request, Response, NextFunction } from "express";

import responseHandler from "../handlers/response.handler";
import User from "../models/user.model";
import { verifyAccessToken } from "../helpers/jwtToken";
import { log } from "console";

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
        return responseHandler.unauthenticate(res);
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;
    
    try {
        const decode = verifyAccessToken(token);

        (req as any).user = typeof decode === "string" ? decode : decode.data;
        next();
    } catch (error: any) {
        if (error.message?.includes("jwt expired")) {
            responseHandler.accessTokenExpired(res);
            return;
        }
        responseHandler.error(res, error);
    }
};
export const validateRegister = async (req: Request, res: Response) => {};
