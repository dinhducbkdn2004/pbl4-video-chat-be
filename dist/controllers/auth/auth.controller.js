"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authValidation_1 = __importDefault(require("./dtos/authValidation"));
const validation_handler_1 = require("../../handlers/validation.handler");
const response_handler_1 = __importDefault(require("../../handlers/response.handler"));
const auth_service_1 = __importDefault(require("./services/auth.service"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const authRoute = (0, express_1.Router)();
authRoute.post("/login", authValidation_1.default.validateLogin, validation_handler_1.validateHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = yield auth_service_1.default.login(email, password);
        response_handler_1.default.ok(res, data, "Đăng nhập thành công");
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
authRoute.post("/register", authValidation_1.default.validateRegister, validation_handler_1.validateHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = yield auth_service_1.default.register(req.body);
        response_handler_1.default.ok(res, { email }, `Đăng kí thành công, vui lòng sử dụng mã OTP đã gửi về email ${email} để xác thực tài khoản`);
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
authRoute.put("/reset-token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const newAccessToken = auth_service_1.default.resetToken(refreshToken);
        response_handler_1.default.ok(res, { accessToken: newAccessToken }, "Get new access token successfully!");
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
authRoute.put("/change-password", auth_middleware_1.authenticate, authValidation_1.default.validateChangePassword, validation_handler_1.validateHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newPassword } = req.body;
        const { userId } = req.user;
        yield auth_service_1.default.changePassword(newPassword, userId);
        response_handler_1.default.ok(res, {}, "Change password successfully!");
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
authRoute.put("/forgot-password", authValidation_1.default.validateForgotPassword, validation_handler_1.validateHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        yield auth_service_1.default.forgotPassword(email);
        response_handler_1.default.ok(res, {
            email,
        }, `Hệ thống đã gửi mã OTP đến tài khoản ${email}. Hãy xác thực tài khoản bằng mã OTP đó!`);
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
authRoute.put("/check-otp", authValidation_1.default.validateCheckOtp, validation_handler_1.validateHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, email } = req.body;
        const data = yield auth_service_1.default.checkOtp(otp, email);
        response_handler_1.default.ok(res, data, "Xác thực OTP thành công!");
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
authRoute.post("/oauth2/google", authValidation_1.default.validateLoginByGoogle, validation_handler_1.validateHandler, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { credential } = req.body;
        const data = yield auth_service_1.default.loginByGoogle(credential);
        return response_handler_1.default.ok(res, data, "Đăng nhập thành công");
    }
    catch (error) {
        response_handler_1.default.errorOrBadRequest(res, error);
    }
}));
exports.default = authRoute;
