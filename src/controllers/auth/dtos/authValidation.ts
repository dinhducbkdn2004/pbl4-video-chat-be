import { body } from "express-validator";
import userModel from "../../../models/user.model";

const validateLogin = [
    body("email")
        .notEmpty()
        .withMessage("Thiếu trường email")
        .isEmail()
        .withMessage("Email không hợp lệ"),
    body("password")
        .notEmpty()
        .withMessage("Thiếu trường password")
        .isLength({ min: 6 })
        .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
];

const validateRegister = [
    body("email")
        .notEmpty()
        .withMessage("thiếu trường email")
        .isEmail()
        .withMessage("Email không hợp lệ")
        .custom(async (value) => {
            const user = await userModel.findOne({ email: value });
            if (user) throw "Đã tồn tại người dùng, hãy dùng email khác!";
        }),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
    body("name").notEmpty().withMessage("Tên không được để trống"),
];
const validateLoginByGoogle = [
    body("credential").notEmpty().withMessage("Thiếu trường credential"),
];
const validateCheckOtp = [
    body("otp")
        .notEmpty()
        .withMessage("thiếu trường otp")
        .isLength({ min: 6 })
        .withMessage("Otp chưa đúng định dạng"),
    body("email")
        .notEmpty()
        .withMessage("thiếu trường email")
        .isEmail()
        .withMessage("Email chưa đúng định dạng"),
];

const validateForgotPassword = [
    body("email")
        .notEmpty()
        .withMessage("thiếu trường email")
        .isEmail()
        .withMessage("Email chưa đúng định dạng"),
];

const validateChangePassword = [
    body("newPassword")
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

export default authInputDto;
