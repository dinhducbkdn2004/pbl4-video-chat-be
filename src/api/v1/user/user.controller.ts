import { Request, Response } from 'express'

import { Router } from 'express'
import userService from './user.service'

import responseHandler from '../../../handlers/response.handler'
import { authenticate } from '../../../middlewares/auth.middleware'

const userRoute: Router = Router()

userRoute.get('/me', authenticate, async (req: Request, res: Response) => {
    try {
        const { userId } = (req as any).user

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
        const user = await userService.getUser(userId)
        responseHandler.ok(res, user, `Hello ${user.name}, welcome back!`)
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})

userRoute.get('/getAll', authenticate, async (req: Request, res: Response) => {
    try {
        const user = await userService.getAllUsers()
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

        responseHandler.ok(res, result.users, 'Tìm kiếm người dùng thành công!')
    } catch (error: any) {
        responseHandler.errorOrBadRequest(res, error)
    }
})
export default userRoute
