import { Request, Response, Router } from 'express'
import authRoute from '../api/v1/auth/auth.controller'
import userRoute from '../api/v1/user/user.controller'

import uploadRoute from '../api/v1/upload/upload.controller'
import chatRoomRoute from '../api/v1/chat-room/chatRoom.controller'
import messageRoute from '~/api/v1/message/message.controller'
import friendRequestRoute from '~/api/v1/friend-request/friendRequest.controller'
import notificationsRoute from '~/api/v1/notifications/notification.controller'
import groupRequestRoute from '~/api/v1/group-request/groupRequest.controller'

const routes: Router = Router()

routes.use('/auth', authRoute)
routes.use('/users', userRoute)
routes.use('/upload', uploadRoute)
routes.use('/chat-rooms', chatRoomRoute)
routes.use('/messages', messageRoute)
routes.use('/friend-requests', friendRequestRoute)
routes.use('/notifications', notificationsRoute)
routes.use('/group-requests', groupRequestRoute)

export default routes
