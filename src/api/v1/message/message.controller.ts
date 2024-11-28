import { Request, Response, Router } from 'express'
import { authenticate } from '../../../middlewares/auth.middleware'
import messageService from './message.service'
import responseHandler from '../../../handlers/response.handler'
import messageValidation from './message.validation'
import { validateHandler } from '~/handlers/validation.handler'
import { CreateMesssage } from './message.dto'
import mongoose from 'mongoose'

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
        const { newMessage, newUpdatedChatRoom } = await messageService.createMessage({
            content,
            fileUrl: file,
            chatRoom: new mongoose.Types.ObjectId(chatRoomId),
            sender: userId,
            type
        })

        responseHandler.ok(res, { message: newMessage, chatRoom: newUpdatedChatRoom }, 'Tạo tin nhắn thành công')
    }
)
messageRoute.get(
    '/get-seo-data',
    authenticate,
    messageValidation.getSeoData,
    validateHandler,
    async (req: Request<{}, {}, {}, { url: string }>, res: Response) => {
        // const { url } = req.query
        // let metadata = {}
        // try {
        //     const { status, data } = await mql(url)
        //     metadata = data
        // } catch (err) {
        //     console.log(err)
        // }

        // responseHandler.ok(res, metadata, 'Lấy thông tin SEO thành công')
        const { url } = req.query
        try {
            const data = await messageService.getSeoData(url)
            responseHandler.ok(res, data, 'Lấy thông tin SEO thành công')
        } catch (err) {
            responseHandler.errorOrBadRequest(res, err)
        }
    }
)

messageRoute.get('/getMediaDocumentLink', authenticate, async (req: Request, res: Response) => {
    try {
        const { chatRoomId, page = '1', limit = '10', type } = req.query

        const messages = await messageService.getMDL(
            chatRoomId as string,
            parseInt(page as string),
            parseInt(limit as string),
            type as 'Media' | 'Document' | 'Link'
        )

        responseHandler.ok(res, messages, `Lấy thành công danh sách ${type}`)
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

messageRoute.patch('/seen-message', authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user
        const { chatRoomId } = req.body
        const seenMessage = await messageService.seenMessage(userId, chatRoomId)

        responseHandler.ok(res, seenMessage, `Cập nhật thành công`)
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})
export default messageRoute
