import { Request, Response } from "express";
import responseHandler from "../../handlers/response.handler";

import userService from "./services/user.service";
import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { SendAddFriendRequestParams } from "./dtos/user.dto";
import { param, query } from "express-validator";
import { validateHandler } from "../../handlers/validation.handler";
import { stat } from "fs";

const userRoute: Router = Router();

userRoute.get("/me", authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;
        console.log(userId);

        const user = await userService.getMe(userId);
        responseHandler.ok(res, user, `Hello ${user.name}, welcome back!`);
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error);
    }
});

userRoute.post(
    "/send-add-friend-request/:friendId",
    authenticate,
    [
        param("friendId")
            .notEmpty()
            .withMessage("thiếu trường friendId")
            .custom(async (value: string) => {
                const user = await userService.getMe(value);
                if (!user) throw "Không tồi tại người dùng để kết bạn";
            }),
    ],
    validateHandler,
    async (req: Request, res: Response) => {
        try {
            const { userId } = (req as any).user;
            const { friendId } = req.params;

            const isSuccess = userService.sendAddFriendRequest(
                userId,
                friendId
            );
            responseHandler.ok(res, { isSuccess }, "Add friend successfully!");
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);

userRoute.put(
    "/update-friend-request/:friendId",
    authenticate,
    [
        param("friendId")
            .notEmpty()
            .withMessage("thiếu trường friendId")
            .custom(async (value: string) => {
                const user = await userService.getMe(value);

                if (!user) throw "Không tồi tại người dùng để kết bạn";
            }),
        // query("status")
        //     .notEmpty()
        //     .withMessage("Thiếu trường status")
        //     .custom((value: string) => {
        //         const isCheck =
        //             value === "PENDING" ||
        //             value === "ACCEPTED" ||
        //             value === "DECLINED";

        //         if (!isCheck)
        //             throw "trường status phải có giá trị PENDING hoặc ACCEPTED hoặc DECLINED";
        //     }),
    ],
    validateHandler,
    async (req: Request, res: Response) => {
        try {
            const { userId } = (req as any).user;

            const { friendId } = req.params;
            const { status } = req.query as {
                status: "PENDING" | "ACCEPTED" | "DECLINED";
            };

            const data = await userService.updateFriendRequest(
                userId,
                friendId,
                status
            );
            responseHandler.ok(
                res,
                data,
                "update friend request successfully!"
            );
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);

userRoute.get(
    "/friend-request",
    authenticate,

    async (req: Request, res: Response) => {
        try {
            const { userId } = (req as any).user;
            const { page, limit } = req.query as {
                page: string;
                limit: string;
            };
            const data = await userService.getFriendRequests(
                userId,
                page,
                limit
            );
            responseHandler.ok(res, data, "get friend request successfully!");
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);
export default userRoute;
