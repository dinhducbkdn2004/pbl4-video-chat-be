import { Request, Response, Router } from 'express'
import { authenticate } from '../../../middlewares/auth.middleware'
import responseHandler from '../../../handlers/response.handler'
import friendRequestService from './friendRequest.service'
import { validateHandler } from '../../../handlers/validation.handler'
import friendRequestInputDto from './friendRequest.dto'

const friendRequestRoute = Router()
friendRequestRoute.get(
    '/get-my',
    authenticate,

    async (req: Request, res: Response) => {
        try {
            const { userId } = (req as any).user
            const { page, limit } = req.query as {
                page: string
                limit: string
            }
            const data = await friendRequestService.getFriendRequests(userId, page, limit)
            responseHandler.ok(res, data, 'get friend request successfully!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

friendRequestRoute.post(
    '/send-add-friend-request/:friendId',
    authenticate,
    friendRequestInputDto.addFriend,
    validateHandler,
    async (req: Request, res: Response) => {
        try {
            const { userId } = (req as any).user
            const { friendId } = req.params
            const { caption } = req.body
            const isSuccess = friendRequestService.sendAddFriendRequest(userId, friendId, caption)
            responseHandler.ok(res, { isSuccess }, 'Add friend successfully!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

friendRequestRoute.put(
    '/update-friend-request/:friendId',
    authenticate,
    validateHandler,
    friendRequestInputDto.updateRequest,
    async (req: Request, res: Response) => {
        try {
            const { userId } = (req as any).user
            const { friendId } = req.params
            const { status } = req.query as {
                status: 'ACCEPTED' | 'DECLINED'
            }

            const data = await friendRequestService.updateFriendRequest(userId, friendId, status)
            responseHandler.ok(res, data, 'update friend request successfully!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

export default friendRequestRoute
