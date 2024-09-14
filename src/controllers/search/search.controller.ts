import { Request, Response } from 'express';
import responseHandler from '../../handlers/response.handler';
import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import searchService from './services/search.service';
import { JwtPayload } from 'jsonwebtoken';

const searchRoute: Router = Router();
searchRoute.get('/chatrooms', authenticate, async (req: Request, res: Response) => {
    try {
        const {
            name,
            page = '1',
            limit = '10',
            typeRoom,
            getMy
        } = req.query as {
            name: string;
            page: string;
            limit: string;
            typeRoom?: 'PUBLIC' | 'PRIVATE';
            getMy?: string;
        };
        const userId = (req.user as JwtPayload).userId as string;

        const result = await searchService.searchChatRooms(
            name,
            Number(page),
            Number(limit),
            typeRoom,
            getMy === 'true',
            userId
        );
        responseHandler.ok(res, result, 'Tìm kiếm chatroom thành công!');
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error);
    }
});

searchRoute.get('/users', authenticate, async (req: Request, res: Response) => {
    try {
        const {
            name,
            page = 1,
            limit = 10
        } = req.query as {
            name: string;
            page: string;
            limit: string;
        };
        const result = await searchService.searchUsers(name, Number(page), Number(limit));

        responseHandler.ok(res, result, 'Tìm kiếm người dùng thành công!');
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error);
    }
});

export default searchRoute;
