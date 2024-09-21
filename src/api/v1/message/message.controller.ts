import { Request, Response, Router } from 'express'
import responseHandler from '../../../handlers/response.handler'
import { Types } from 'mongoose'
import { authenticate } from '../../../middlewares/auth.middleware'
import messageService from './message.service'

const messageRoute: Router = Router()

messageRoute.get('/message', authenticate, async (req: Request, res: Response) => {
    try {
        const { chatRoomId } = req.query as { chatRoomId: string }

        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10

        if (!Types.ObjectId.isValid(chatRoomId)) {
            return res.status(400).json({ message: 'Invalid chatRoomId' })
        }

        const messages = await messageService.getMessagesByChatRoomId(chatRoomId, page, limit)

        return messages
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})
export default messageRoute
