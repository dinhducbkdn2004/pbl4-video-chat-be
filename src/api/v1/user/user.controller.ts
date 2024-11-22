import { Request, Response } from 'express'

import { Router } from 'express'
import userService from './user.service'

import responseHandler from '../../../handlers/response.handler'
import { authenticate } from '../../../middlewares/auth.middleware'
import { getOneToOneChatRoom } from '../chat-room/services/getOneToOneChatRoom'
import chatRoomService from '../chat-room/chatRoom.service'

const userRoute: Router = Router()

userRoute.get('/me', authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user

        const user = await userService.getUser(userId)
        responseHandler.ok(res, user, `Hello ${user.name}, welcome back!`)
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

userRoute.patch('/me/edit-profile', authenticate, async (req: Request, res: Response) => {
    try {
        const { name, avatar, introduction, backgroundImage } = req.body

        const { userId } = req.user

        const updatedProfile = await userService.editProfile({ userId, name, avatar, introduction, backgroundImage })

        responseHandler.ok(res, updatedProfile, 'Cậpt nhập thông tin người dùng thành công!')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

userRoute.get('/get-detail/:userId/friend-list', authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const users = await userService.getFriendList(userId)
        responseHandler.ok(res, users, 'Lấy danh sách thành công!')
    } catch (error) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

userRoute.get('/get-detail/:userId', authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const { userId: userCallApiId } = req.user
        const user = await userService.getUserProfile({ userId, authId: userCallApiId })
        const { _id, name, avatar, backgroundImage, introduction, isOnline, friends, isFriend } = user
        const oneToOneRoom = await chatRoomService.getOneToOneChatRoom(userCallApiId, user._id.toString())

        if (oneToOneRoom !== null)
            return responseHandler.ok(
                res,
                {
                    isFriend,
                    _id,
                    name,
                    avatar,
                    backgroundImage,
                    introduction,
                    isOnline,
                    friends,
                    chatRoomId: oneToOneRoom._id
                },
                `Hello ${user.name}, welcome back!`
            )

        const newOneToOneRoom = await chatRoomService.createChatRoom(userCallApiId, [userId], '', 'PRIVATE')

        responseHandler.ok(
            res,
            {
                _id,
                name,
                avatar,
                backgroundImage,
                introduction,
                isOnline,
                friends,
                chatRoomId: newOneToOneRoom._id,
                isFriend
            },
            `Hello ${user.name}, welcome back!`
        )
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

userRoute.get('/getAll', authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = req.user
        const user = await userService.getAllUsers(userId)
        responseHandler.ok(res, user, ``)
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

userRoute.get('/search', authenticate, async (req: Request, res: Response) => {
    try {
        const {
            name,
            page = 1,
            limit = 10
        } = req.query as {
            name: string
            page: string
            limit: string
        }
        const result = await userService.searchUsers(name, Number(page), Number(limit))

        responseHandler.ok(res, result, 'Tìm kiếm người dùng thành công!')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})
userRoute.delete('/remove-friend', authenticate, async (req: Request, res: Response) => {
    try {
        const { friendId } = req.query as {
            friendId: string
        }
        const { userId } = req.user
        const response = await userService.removeFriend(userId, friendId)
        responseHandler.ok(res, response, 'Xóa bạn bè thành công!')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})
export default userRoute
