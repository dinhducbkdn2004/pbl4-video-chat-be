import { Request, Response, Router } from 'express';

import authRoute from '../controllers/auth/auth.controller';
import userRoute from '../controllers/user/user.controller';
import searchRoute from '../controllers/search/search.controller';
import uploadRoute from '../controllers/upload/upload.controller';
import chatRoomRoute from '../controllers/chatRoom/chatRoom.controller';

const routes: Router = Router();

routes.use('/auth', authRoute);
routes.use('/users', userRoute);
routes.use('/search', searchRoute);
routes.use('/upload', uploadRoute);
routes.use('/chat-rooms', chatRoomRoute);

export default routes;
