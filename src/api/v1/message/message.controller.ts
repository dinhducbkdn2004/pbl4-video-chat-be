import { Request, Response, Router } from 'express'
import { authenticate } from '../../../middlewares/auth.middleware'
import messageService from './message.service'
import responseHandler from '../../../handlers/response.handler'
import messageValidation from './message.validation'
import { validateHandler } from '~/handlers/validation.handler'
import { CreateMesssage } from './message.dto'
import { getIO } from '~/socket/socket'

const messageRoute: Router = Router()

messageRoute.get(
    '/byRoomchatId',
    authenticate,
    messageValidation.getByRoomchatId,
    validateHandler,
    async (req: Request, res: Response) => {
        try {
            const {
                chatRoomId,
                page = '1',
                limit = '10'
            } = req.query as {
                chatRoomId: string
                page: string
                limit: string
            }
            const result = await messageService.getMessagesByChatRoomId(chatRoomId, Number(page), Number(limit))

            responseHandler.ok(res, result, 'Lấy danh sách tin nhắn thành công')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

messageRoute.post(
    '/',
    authenticate,
    messageValidation.createMessage,
    validateHandler,
    async (req: Request<{}, {}, CreateMesssage>, res: Response) => {
        const { userId } = req.user
        const { content, type, file, chatRoomId } = req.body
        const { newMessage, updatedChatRoom } = await messageService.createMessage(
            userId,
            content,
            chatRoomId,
            type,
            file
        )

        responseHandler.ok(res, { message: newMessage, chatRoom: updatedChatRoom }, 'Tạo tin nhắn thành công')
    }
)

export default messageRoute
