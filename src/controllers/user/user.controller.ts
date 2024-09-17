import { Request, Response } from 'express';
import responseHandler from '../../handlers/response.handler';

import userService from './services/user.service';
import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { SendAddFriendRequestParams } from './dtos/user.dto';
import { param, query } from 'express-validator';

import { validateHandler } from '../../handlers/validation.handler';
import { log } from 'console';

const userRoute: Router = Router();

userRoute.get('/me', authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user;

        const user = await userService.getUser(userId);
        responseHandler.ok(res, user, `Hello ${user.name}, welcome back!`);
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error);
    }
});

userRoute.put('/me/edit-profile', authenticate, async (req: Request, res: Response) => {
    try {
        const { name, avatar, introduction, backgroundImage } = req.body;
        console.log(req.body);

        const { userId } = (req as any).user;
        const updatedProfile = await userService.editProfile({ userId, name, avatar, introduction, backgroundImage });
        responseHandler.ok(res, updatedProfile, 'Cậpt nhập thông tin người dùng thành công!');
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error);
    }
});
userRoute.get('/get-detail/:userId/friend-list', authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const users = await userService.getFriendList(userId);
        responseHandler.ok(res, users, 'Lấy danh sách thành công!');
    } catch (error) {
        responseHandler.errorOrBadRequest(res, error);
    }
});

userRoute.get('/get-detail/:userId', authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUser(userId);
        responseHandler.ok(res, user, `Hello ${user.name}, welcome back!`);
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error);
    }
});

userRoute.get('/getAll', authenticate, async (req: Request, res: Response) => {
    try {
        const user = await userService.getAllUsers();
        responseHandler.ok(res, user, ``);
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error);
    }
});

userRoute.post(
    '/send-add-friend-request/:friendId',
    authenticate,
    [
        param('friendId')
            .notEmpty()
            .withMessage('thiếu trường friendId')
            .custom(async (value: string) => {
                const user = await userService.getUser(value);
                if (!user) throw 'Không tồi tại người dùng để kết bạn';
            })
    ],
    validateHandler,
    async (req: Request, res: Response) => {
        try {
            const { userId } = (req as any).user;
            const { friendId } = req.params;
            const { caption } = req.body;
            const isSuccess = userService.sendAddFriendRequest(userId, friendId, caption);
            responseHandler.ok(res, { isSuccess }, 'Add friend successfully!');
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);

userRoute.put(
    '/update-friend-request/:friendId',
    authenticate,
    [
        param('friendId')
            .notEmpty()
            .withMessage('thiếu trường friendId')
            .custom(async (value: string) => {
                const user = await userService.getUser(value);

                if (!user) throw 'Không tồi tại người dùng để kết bạn';
            })
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
                status: 'ACCEPTED' | 'DECLINED';
            };

            const data = await userService.updateFriendRequest(userId, friendId, status);
            responseHandler.ok(res, data, 'update friend request successfully!');
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);

userRoute.get(
    '/friend-request',
    authenticate,

    async (req: Request, res: Response) => {
        try {
            const { userId } = (req as any).user;
            const { page, limit } = req.query as {
                page: string;
                limit: string;
            };
            const data = await userService.getFriendRequests(userId, page, limit);
            responseHandler.ok(res, data, 'get friend request successfully!');
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error);
        }
    }
);
export default userRoute;
