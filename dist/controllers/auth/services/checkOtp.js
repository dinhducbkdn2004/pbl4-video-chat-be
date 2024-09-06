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
const user_model_1 = __importDefault(require("../../../models/user.model"));
const jwtToken_1 = require("../../../helpers/jwtToken");
const jwtToken_2 = require("../../../helpers/jwtToken");
const checkOtp = (otp, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        throw new Error("Không tồn tại email!");
    if (user.account.otp !== otp) {
        throw new Error("OTP không hợp lệ!");
    }
    if (user.account.otpExp < new Date()) {
        throw new Error("OTP đã hết hạn!");
    }
    const accessToken = (0, jwtToken_1.generateAccessToken)(user._id);
    const refreshToken = (0, jwtToken_2.generateRefreshToken)(user._id);
    user.account.isVerified = true;
    yield user.save();
    return { accessToken, refreshToken };
});
exports.default = checkOtp;
//# sourceMappingURL=checkOtp.js.map