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

const authInputDto = {
    validateLogin,
    validateRegister,
};
export default authInputDto;
