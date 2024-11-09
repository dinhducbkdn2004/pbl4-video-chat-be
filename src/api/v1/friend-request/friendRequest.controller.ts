import { Request, Response, Router } from 'express'
import { authenticate } from '../../../middlewares/auth.middleware'
import responseHandler from '../../../handlers/response.handler'
import friendRequestService from './friendRequest.service'
import { validateHandler } from '../../../handlers/validation.handler'
import { CreateFriendRequestDto, UpdateFriendRequestDto, UpdateFriendRequestParams } from './friendRequest.dto'
import friendRequestValidation from './friendRequest.validation'
import { getIO } from '~/configs/socket.config'
import { createNotification } from '../notifications/services/createNotification'

const friendRequestRoute = Router()

friendRequestRoute.get('/get-my', authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user

        const { page = 1, limit = 10 } = req.query as {
            page: string
            limit: string
        }
        const data = await friendRequestService.getFriendRequests(userId, +page, +limit)
        responseHandler.ok(res, data, 'Lấy danh sách yêu cầu kết bạn thành công!')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

friendRequestRoute.post(
    '/add-friend',
    authenticate,
    friendRequestValidation.addFriend,
    validateHandler,
    async (req: Request<{}, {}, CreateFriendRequestDto>, res: Response) => {
        try {
            const { userId } = req.user
            const { caption, friendId } = req.body

            const newRequest = await friendRequestService.sendAddFriendRequest(userId, friendId, caption)

            responseHandler.ok(res, newRequest, 'Gửi lời mời kết bạn thành công!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

friendRequestRoute.patch(
    '/update/:requestId',
    authenticate,
    friendRequestValidation.updateRequest,
    validateHandler,
    async (req: Request<UpdateFriendRequestParams, {}, UpdateFriendRequestDto>, res: Response) => {
        try {
            const { userId } = req.user
            const { requestId } = req.body
            const { status } = req.body

            const updatedRequest = await friendRequestService.updateFriendRequest(userId, requestId, status)

            responseHandler.ok(res, updatedRequest, 'Cập nhật lời mời kết bạn thành công!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

export default friendRequestRoute
