import { Router } from "express";

import { validateLogin } from "../validations/auth.validation";
import authController from "../controllers/auth/auth.controller";

const authRoute: Router = Router();

authRoute.post("/login", validateLogin, authController.login);
authRoute.post("/register", authController.register);
authRoute.put("/reset-token", authController.resetToken);

export default authRoute;
