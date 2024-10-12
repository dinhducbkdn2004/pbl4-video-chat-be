import { Request, Response, Router } from 'express'
import responseHandler from '../../../handlers/response.handler'
import { authenticate } from '../../../middlewares/auth.middleware'
import { notificationService } from './notification.service'

const notificationsRoute: Router = Router()

notificationsRoute.get(
    '/',
    authenticate,

    async (req: Request, res: Response) => {
        try {
            const { userId } = req.user
            const { page, limit } = req.query
            const result = (await notificationService.getNotifications(userId, Number(page), Number(limit))) || []

            responseHandler.ok(res, result, 'Lấy danh sách tin nhắn thành công')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

notificationsRoute.patch(
    '/seen-notification',
    authenticate,

    async (req: Request, res: Response) => {
        try {
            const { userId } = req.user
            const { notificationId } = req.body
            const result = await notificationService.seenNotification(userId, notificationId)

            responseHandler.ok(res, result, 'Đã đọc tất cả thông báo')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

export default notificationsRoute
