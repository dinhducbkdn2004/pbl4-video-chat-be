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
const OtpForm_1 = __importDefault(require("../../../constants/OtpForm"));
const generateRandomNumberString_1 = __importDefault(require("../../../helpers/generateRandomNumberString"));
const sendMail_1 = __importDefault(require("../../../helpers/sendMail"));
const user_model_1 = __importDefault(require("../../../models/user.model"));
const sendOtp = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    if (!user)
        throw "User not found";
    const otp = (0, generateRandomNumberString_1.default)(6);
    (0, sendMail_1.default)([user.email], "Mã xác thực tài khoản", (0, OtpForm_1.default)(otp));
    user.account.otp = otp;
    user.account.otpExp = new Date(Date.now() + 5 * 60 * 1000);
    yield user.save();
});
exports.default = sendOtp;
