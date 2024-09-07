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
const generateRandomNumberString_1 = __importDefault(require("../../../helpers/generateRandomNumberString"));
const sendMail_1 = __importDefault(require("../../../helpers/sendMail"));
const OtpForm_1 = __importDefault(require("../../../constants/OtpForm"));
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user)
        throw new Error("User not found!");
    const otp = (0, generateRandomNumberString_1.default)(6);
    const otpExp = new Date(Date.now() + 15 * 60 * 1000);
    user.account.otp = otp;
    user.account.otpExp = otpExp;
    yield user.save();
    (0, sendMail_1.default)([email], "Mã xác thực đổi mật khẩu", (0, OtpForm_1.default)(otp));
});
exports.default = forgotPassword;
//# sourceMappingURL=forgotPassword.js.map