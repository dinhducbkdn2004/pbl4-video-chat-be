import { Request, Response, Router } from 'express'
import { authenticate } from '../../../middlewares/auth.middleware'
import responseHandler from '../../../handlers/response.handler'
import friendRequestService from './friendRequest.service'
import { validateHandler } from '../../../handlers/validation.handler'
import { CreateFriendRequestDto, UpdateFriendRequestDto } from './friendRequest.dto'
import friendRequestValidation from './friendRequest.validation'
import { log } from 'console'

const friendRequestRoute = Router()
friendRequestRoute.get(
    '/get-my',
    authenticate,

    async (req: Request, res: Response) => {
        try {
            const { userId } = req.user

            const { page = 1, limit = 10 } = req.query as {
                page: string
                limit: string
            }

            const data = await friendRequestService.getFriendRequests(userId, +page, +limit)
            responseHandler.ok(res, data, 'get friend request successfully!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

friendRequestRoute.post(
    '/add-friend',
    authenticate,
    friendRequestValidation.addFriend,
    validateHandler,
    async (req: Request<{}, {}, CreateFriendRequestDto>, res: Response) => {
        try {
            const { userId } = req.user
            const { caption, friendId } = req.body

            const newRequest = friendRequestService.sendAddFriendRequest(userId, friendId, caption)
            responseHandler.ok(res, newRequest, 'Add friend successfully!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

friendRequestRoute.patch(
    '/update/:requestId',
    authenticate,
    validateHandler,
    friendRequestValidation.updateRequest,
    async (req: Request<{ requestId: string }, {}, UpdateFriendRequestDto>, res: Response) => {
        try {
            const { userId } = req.user
            const { status } = req.body
            const { requestId } = req.params

            const data = await friendRequestService.updateFriendRequest(userId, requestId, status)
            responseHandler.ok(res, data, 'update friend request successfully!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

export default friendRequestRoute
