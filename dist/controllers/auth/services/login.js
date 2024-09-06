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
const hashPassword_1 = require("../../../helpers/hashPassword");
const jwtToken_1 = require("../../../helpers/jwtToken");
const user_model_1 = __importDefault(require("../../../models/user.model"));
const auth_service_1 = __importDefault(require("./auth.service"));
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        email,
    });
    if (user === null)
        throw "Not found your account!";
    if (user.account.isVerified === false) {
        yield auth_service_1.default.sendOtp(user._id.toString());
        throw `Your account hasn't been verified. We has send otp to email: ${user.email}. Please use this otp to verify your accout!`;
    }
    if (!user.account.password)
        throw "Phải đăng nhập bằng google và đổi lại mật khẩu!";
    if ((yield (0, hashPassword_1.comparePassword)(password, user.account.password)) === false)
        throw "Wrong password!";
    const accessToken = (0, jwtToken_1.generateAccessToken)({ userId: user._id });
    const refreshToken = (0, jwtToken_1.generateRefreshToken)({ userId: user._id });
    return {
        accessToken,
        refreshToken,
    };
});
exports.default = login;
//# sourceMappingURL=login.js.map