"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const changePassword_1 = __importDefault(require("./changePassword"));
const checkOtp_1 = __importDefault(require("./checkOtp"));
const forgotPassword_1 = __importDefault(require("./forgotPassword"));
const login_1 = __importDefault(require("./login"));
const loginByGoogle_1 = __importDefault(require("./loginByGoogle"));
const register_1 = __importDefault(require("./register"));
const resetToken_1 = __importDefault(require("./resetToken"));
const sendOtp_1 = __importDefault(require("./sendOtp"));
const authService = {
    register: register_1.default,
    login: login_1.default,
    resetToken: resetToken_1.default,
    checkOtp: checkOtp_1.default,
    changePassword: changePassword_1.default,
    forgotPassword: forgotPassword_1.default,
    loginByGoogle: loginByGoogle_1.default,
    sendOtp: sendOtp_1.default,
};
exports.default = authService;
