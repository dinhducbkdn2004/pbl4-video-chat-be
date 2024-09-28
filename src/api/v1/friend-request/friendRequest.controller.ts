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

            await createNotification(
                'Bạn có một lời mời kết bạn mới!',
                friendId,
                'FRIEND_REQUEST',
                newRequest._id.toString()
            )

            const io = getIO()
            io.to(friendId).emit('new friend request', newRequest)

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
            const { status } = req.body
            const { requestId } = req.params

            const { updatedRequest, senderUser, receiverUser } = await friendRequestService.updateFriendRequest(
                userId,
                requestId,
                status
            )

            const io = getIO()
            if (senderUser.socketId) {
                io.to(senderUser.socketId).emit('friend request accepted', {
                    message: 'Đã chấp nhận lời mời kết bạn',
                    friend: receiverUser
                })
            }
            const notificationMessage =
                status === 'ACCEPTED'
                    ? 'Yêu cầu kết bạn của bạn đã được chấp nhận!'
                    : 'Yêu cầu kết bạn của bạn đã bị từ chối.'

            await createNotification(
                notificationMessage,
                senderUser._id.toString(),
                'FRIEND_REQUEST',
                updatedRequest._id.toString()
            )

            responseHandler.ok(res, updatedRequest, 'Cập nhật lời mời kết bạn thành công!')
        } catch (error: any) {
            responseHandler.errorOrBadRequest(res, error)
        }
    }
)

export default friendRequestRoute
