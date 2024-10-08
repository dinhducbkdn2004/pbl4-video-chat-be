import { Request, Response } from 'express'

import { Router } from 'express'
import chatRoomService from './chatRoom.service'
import { authenticate } from '../../../middlewares/auth.middleware'
import responseHandler from '../../../handlers/response.handler'
import chatRoomValidation from './chatroom.validation'
import { validateHandler } from '../../../handlers/validation.handler'
import { createChatRoom, searchChatroomQueryParams } from './chatRoom.dto'
import notificationModel from '../notifications/notification.model'
import { notificationService } from '../notifications/notification.service'

const chatRoomRoute: Router = Router()

chatRoomRoute.post(
    '/',
    authenticate,
    chatRoomValidation.create,
    validateHandler,
    async (req: Request<{}, {}, createChatRoom>, res: Response) => {
        try {
            const { users, name = '', privacy } = req.body
            const { userId } = req.user

            const newChatRoom = await chatRoomService.createChatRoom(userId, users, name, privacy)

            responseHandler.ok(res, newChatRoom, 'Tạo room thành công')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

chatRoomRoute.get(
    '/search',
    authenticate,
    async (req: Request<{}, {}, {}, Partial<searchChatroomQueryParams>>, res: Response) => {
        try {
            const { name, page = '1', limit = '10', privacy, getMy } = req.query
            const { userId } = req.user

            const result = await chatRoomService.searchChatRooms(
                name,
                Number(page),
                Number(limit),
                privacy,
                getMy === 'true',
                userId
            )
            responseHandler.ok(res, result, 'Tìm kiếm chatroom thành công!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

chatRoomRoute.get(
    '/getOneToOne',
    authenticate,
    async (req: Request<{}, {}, {}, Partial<{ to: string }>>, res: Response) => {
        try {
            const { to } = req.query
            const { userId } = req.user

            const oneToOneRoom = await chatRoomService.getOneToOneChatRoom(userId, to as string)
            if (oneToOneRoom) return responseHandler.ok(res, oneToOneRoom, 'Tìm kiếm chatroom thành công!')

            const newOneToOneRoom = await chatRoomService.createChatRoom(userId, [to as string], '', 'PRIVATE')
            responseHandler.ok(res, newOneToOneRoom, 'Tìm kiếm chatroom thành công!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

chatRoomRoute.get('/:chatRoomId', authenticate, async (req: Request, res: Response) => {
    try {
        const { chatRoomId } = req.params
        const { userId } = req.user
        const chatRoom = await chatRoomService.getChatRoomById(chatRoomId, userId)
        responseHandler.ok(res, chatRoom, 'Tìm kiếm chatroom thành công!')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

chatRoomRoute.post('/add-member', authenticate, async (req: Request, res: Response) => {
    try {
        const { chatRoomId } = req.body
        const { newMemberId } = req.body
        const { userId } = req.user

        const updatedChatRoom = await chatRoomService.addMember(chatRoomId, newMemberId, userId)
        responseHandler.ok(res, updatedChatRoom, 'Thêm thành viên thành công!')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

chatRoomRoute.delete('/remove-member', authenticate, async (req: Request, res: Response) => {
    try {
        const { chatRoomId } = req.body
        const { memberId } = req.body
        const { userId } = req.user

        const updatedChatRoom = await chatRoomService.removeMember(chatRoomId, memberId, userId)

        responseHandler.ok(res, updatedChatRoom, 'Xóa thành viên thành công!')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})
chatRoomRoute.patch('/change-details', authenticate, async (req: Request, res: Response) => {
    try {
        const { chatRoomId } = req.body
        const { userId } = req.user
        const { newName, newImage } = req.body

        const updatedChatRoom = await chatRoomService.changeDetails(chatRoomId, userId, newName, newImage)

        responseHandler.ok(res, updatedChatRoom, 'Thay đổi thông tin phòng chat thành công!')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})
export default chatRoomRoute
