import { Request, Response } from 'express';
import responseHandler from '../../handlers/response.handler';
import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import chatRoomService from './services/chatRoom.service';

const chatRoomRoute: Router = Router();
chatRoomRoute.post('/', authenticate, async (req: Request, res: Response) => {
    try {
        const { users, name } = req.body;
        const { userId } = (req as any).user;
        users.push(userId);
        const newChatRoom = await chatRoomService.createChatRoom(users, name);
        responseHandler.ok(res, newChatRoom, 'Tạo room thành công');
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error);
    }
});
export default chatRoomRoute;
