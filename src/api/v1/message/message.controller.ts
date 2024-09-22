import { Request, Response, Router } from 'express'
import { authenticate } from '../../../middlewares/auth.middleware'
import messageService from './message.service'
import responseHandler from '../../../handlers/response.handler'

const messageRoute: Router = Router()

messageRoute.get('/byRoomchatId', authenticate, async (req: Request, res: Response) => {
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

        if (!result || result.length === 0) {
            return responseHandler.notFound(res, 'Không tìm thấy tin nhắn nào')
        }

        responseHandler.ok(res, result, 'Lấy danh sách tin nhắn thành công')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

export default messageRoute
