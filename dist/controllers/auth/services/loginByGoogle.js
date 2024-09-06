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
const googleAuth_1 = __importDefault(require("../../../helpers/googleAuth"));
const user_model_1 = __importDefault(require("../../../models/user.model"));
const jwtToken_1 = require("../../../helpers/jwtToken");
const loginByGoogle = (credential) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, googleAuth_1.default)(credential);
    if (!data)
        throw "Không thể đăng nhập bằng google";
    const user = yield user_model_1.default.findOne({ email: data.email });
    if (user)
        return {
            accessToken: (0, jwtToken_1.generateAccessToken)({ userId: user._id }),
            refreshToken: (0, jwtToken_1.generateRefreshToken)({ userId: user._id }),
        };
    const newUser = yield user_model_1.default.create({
        email: data.email,
        name: data.name,
        avatar: data.picture,
        account: {
            loginType: "GOOGLE",
            isVerified: true,
        },
    });
    return {
        accessToken: (0, jwtToken_1.generateAccessToken)({ userId: newUser._id }),
        refreshToken: (0, jwtToken_1.generateRefreshToken)({ userId: newUser._id }),
    };
});
exports.default = loginByGoogle;
