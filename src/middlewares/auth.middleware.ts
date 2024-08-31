import { NextFunction, Request, Response } from "express";

import responseHandler from "../handlers/response.handler";
import { verifyAccessToken } from "../helpers/jwtToken";

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
        console.log(error);

        if (error.message?.includes("jwt expired")) {
            responseHandler.accessTokenExpired(res);
            return;
        }
        responseHandler.error(res, error);
    }
};

