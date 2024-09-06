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
const hashPassword_1 = require("../../../helpers/hashPassword");
const changePassword = (newPassword, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return { success: false, message: "Người dùng không tồn tại!" };
        }
        const hashedPassword = yield (0, hashPassword_1.hashPassword)(newPassword);
        user.account.password = hashedPassword;
        yield user.save();
        return { success: true, message: "Mật khẩu đã được thay đổi thành công!" };
    }
    catch (error) {
        return { success: false, message: `Có lỗi xảy ra: ${error}` };
    }
});
exports.default = changePassword;
//# sourceMappingURL=changePassword.js.map