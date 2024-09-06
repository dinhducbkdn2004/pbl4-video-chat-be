"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../configs/env"));
const generateToken = (data, secretKey, timeExp) => {
    try {
        return jsonwebtoken_1.default.sign({ data }, secretKey, {
            expiresIn: timeExp,
            algorithm: "HS256",
        });
    }
    catch (error) {
        throw error;
    }
};
const verifyToken = (token, secretKey) => {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        throw error;
    }
};
const generateAccessToken = (data) => generateToken(data, env_1.default.JWT_SECRET_ACCESS_TOKEN, env_1.default.JWT_ACCESS_TOKEN_EXPIRE);
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (data) => generateToken(data, env_1.default.JWT_SECRET_REFRESH_TOKEN, env_1.default.JWT_REFRESH_TOKEN_EXPIRE);
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = (token) => verifyToken(token, env_1.default.JWT_SECRET_ACCESS_TOKEN);
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => verifyToken(token, env_1.default.JWT_SECRET_REFRESH_TOKEN);
exports.verifyRefreshToken = verifyRefreshToken;
