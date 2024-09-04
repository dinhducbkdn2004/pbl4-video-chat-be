import { Request, Response } from "express";
import responseHandler from "../../helpers/handlers/response.handler";

import userService from "./services/user.service";
import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";

const userRoute: Router = Router();

userRoute.get("/me", authenticate, async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user;

    const user = await userService.getMe(userId);
    responseHandler.ok(res, user, `Hello ${user.name}, welcome back!`);
  } catch (error: any) {
    responseHandler.errorOrBadRequest(res, error);
  }
});

export default userRoute;
