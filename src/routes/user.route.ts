import { Router } from "express";
import { getMe } from "../controllers/user/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const userRoute: Router = Router();

userRoute.get("/me", authenticate, getMe);


export default userRoute;
