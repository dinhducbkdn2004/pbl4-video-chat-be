import { Request, Response } from 'express'

import { Router } from 'express'

import chatRoomService from './chatRoom.service'
import { authenticate } from '../../../middlewares/auth.middleware'
import responseHandler from '../../../handlers/response.handler'
import chatRoomValidation from './chatroom.validation'
import { validateHandler } from '../../../handlers/validation.handler'
import { createChatRoom } from './chatRoom.dto'

const chatRoomRoute: Router = Router()

chatRoomRoute.post(
    '/',
    authenticate,
    chatRoomValidation.create,
    validateHandler,
    async (req: Request<{}, {}, createChatRoom>, res: Response) => {
        try {
            const { users, name = '' } = req.body
            const { userId } = req.user
            users.push(userId)

            const newChatRoom = await chatRoomService.createChatRoom(users, name)

            responseHandler.ok(res, newChatRoom, 'Tạo room thành công')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

chatRoomRoute.get('/search', authenticate, async (req: Request, res: Response) => {
    try {
        const {
            name,
            page = '1',
            limit = '10',
            typeRoom,
            getMy
        } = req.query as {
            name: string
            page: string
            limit: string
            typeRoom?: 'PUBLIC' | 'PRIVATE'
            getMy?: string
        }
        const { userId } = req.user

        const result = await chatRoomService.searchChatRooms(
            name,
            Number(page),
            Number(limit),
            typeRoom,
            getMy === 'true',
            userId
        )
        responseHandler.ok(res, result, 'Tìm kiếm chatroom thành công!')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})
export default chatRoomRoute
