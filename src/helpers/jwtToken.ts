import jwt from "jsonwebtoken";
import type { Secret } from "jsonwebtoken";

import envServer from "../configs/env";

const generateToken = (
    data: object,
    secretKey: Secret,
    timeExp: string | number
): string => {
    try {
        return jwt.sign({ data }, secretKey, {
            expiresIn: timeExp,
            algorithm: "HS256",
        });
    } catch (error: any) {
        throw error;
    }
};

const verifyToken = (token: string, secretKey: Secret) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error: any) {
        throw error;
    }
};

export const generateAccessToken = (data: object) =>
    generateToken(
        data,
        envServer.JWT_SECRET_ACCESS_TOKEN as string,
        envServer.JWT_REFRESH_TOKEN_EXPIRE as string
    );

export const generateRefreshToken = (data: object) =>
    generateToken(
        data,
        envServer.JWT_SECRET_REFRESH_TOKEN as string,
        envServer.JWT_REFRESH_TOKEN_EXPIRE as string
    );

export const verifyAccessToken = (token: string) =>
    verifyToken(token, envServer.JWT_SECRET_ACCESS_TOKEN as string);
export const verifyRefreshToken = (token: string) =>
    verifyToken(token, envServer.JWT_SECRET_REFRESH_TOKEN as string);
