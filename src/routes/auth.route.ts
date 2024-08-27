import { Router } from "express";

import { validateLogin } from "../validations/auth.validation";
import authController from "../controllers/auth/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const authRoute: Router = Router();

authRoute.post("/login", validateLogin, authController.login);
authRoute.post("/register", authController.register);
authRoute.put("/reset-token", authController.resetToken);
authRoute.put("/change-password", authenticate, authController.changePassword);
authRoute.put("/forgot-password", authController.forgotPassword);
authRoute.put("/check-otp", authenticate, authController.checkOtp);

export default authRoute;
