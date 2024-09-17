import { Request, Response } from 'express';
import responseHandler from '../../handlers/response.handler';
import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { searchChatroom, SearchUsers } from './dtos/search.dto';
import searchUsers from './services/searchUsers';
import searchService from './services/search.service';

const searchRoute: Router = Router();
searchRoute.get('/chatrooms', authenticate, async (req: Request, res: Response) => {
    const { name, page, limit } = req.query as {
        name: string;
        page: string;
        limit: string;
    };
    const result = await searchService.searchChatRooms(name, Number(page), Number(limit));

    responseHandler.ok(res, result, 'Tìm kiếm người dùng thành công!');
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

        responseHandler.ok(res, result.users, 'Tìm kiếm người dùng thành công!');
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error);
    }
});

export default searchRoute;
