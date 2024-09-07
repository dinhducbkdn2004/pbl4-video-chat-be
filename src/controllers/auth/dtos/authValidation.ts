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

const validateResetPassword = [
  body("email")
    .notEmpty()
    .withMessage("Thiếu trường email")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("otp")
    .notEmpty()
    .withMessage("Thiếu trường OTP")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP phải có 6 ký tự"),
  body("newPassword")
    .notEmpty()
    .withMessage("Thiếu trường mật khẩu mới")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu mới phải có ít nhất 6 ký tự"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Thiếu trường xác nhận mật khẩu")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Mật khẩu xác nhận không khớp với mật khẩu mới");
      }
      return true;
    }),
];

const authInputDto = {
  validateResetPassword,
  validateChangePassword,
  validateForgotPassword,
  validateCheckOtp,
  validateLoginByGoogle,
  validateLogin,
  validateRegister,
};

export default authInputDto;
