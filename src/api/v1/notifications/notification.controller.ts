import { Request, Response, Router } from 'express'
import responseHandler from '../../../handlers/response.handler'
import { authenticate } from '../../../middlewares/auth.middleware'
import { notificationService } from './notification.service'
import notificationValidation from './notification.validation'
import { validateHandler } from '~/handlers/validation.handler'

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
    notificationValidation.updateNotification,
    validateHandler,
    async (req: Request, res: Response) => {
        try {
            const { notificationId } = req.body
            const result = await notificationService.seenNotification(notificationId)

            responseHandler.ok(res, result, 'Update thông báo thành công')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

export default notificationsRoute
