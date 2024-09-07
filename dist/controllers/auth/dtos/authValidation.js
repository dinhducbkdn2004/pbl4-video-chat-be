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
const express_validator_1 = require("express-validator");
const user_model_1 = __importDefault(require("../../../models/user.model"));
const validateLogin = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Thiếu trường email")
        .isEmail()
        .withMessage("Email không hợp lệ"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Thiếu trường password")
        .isLength({ min: 6 })
        .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
];
const validateRegister = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("thiếu trường email")
        .isEmail()
        .withMessage("Email không hợp lệ")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.default.findOne({ email: value });
        if (user)
            throw "Đã tồn tại người dùng, hãy dùng email khác!";
    })),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("Tên không được để trống"),
];
const validateLoginByGoogle = [
    (0, express_validator_1.body)("credential").notEmpty().withMessage("Thiếu trường credential"),
];
const validateCheckOtp = [
    (0, express_validator_1.body)("otp")
        .notEmpty()
        .withMessage("thiếu trường otp")
        .isLength({ min: 6 })
        .withMessage("Otp chưa đúng định dạng"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("thiếu trường email")
        .isEmail()
        .withMessage("Email chưa đúng định dạng"),
];
const validateForgotPassword = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("thiếu trường email")
        .isEmail()
        .withMessage("Email chưa đúng định dạng"),
];
const validateChangePassword = [
    (0, express_validator_1.body)("newPassword")
        .notEmpty()
        .withMessage("thiếu trường newPassword")
        .isLength({ min: 6 })
        .withMessage("Password phải tối thiểu 6 kí tự"),
];
const authInputDto = {
    validateChangePassword,
    validateForgotPassword,
    validateCheckOtp,
    validateLoginByGoogle,
    validateLogin,
    validateRegister,
};
exports.default = authInputDto;
//# sourceMappingURL=authValidation.js.map