import { Router } from "express";
import authController from "../controllers/auth/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

import { validateHandler } from "../handlers/validation.handler";
import authValidation from "./../validations/auth.validation";

const authRoute: Router = Router();

authRoute.post(
    "/login",
    authValidation.validateLogin,
    validateHandler,
    authController.login
);

authRoute.post(
    "/register",
    authValidation.validateRegister,
    validateHandler,
    authController.register
);

authRoute.put("/reset-token", authController.resetToken);
authRoute.put("/change-password", authenticate, authController.changePassword);
authRoute.put("/forgot-password", authController.forgotPassword);
authRoute.put("/check-otp", authenticate, authController.checkOtp);

export default authRoute;
