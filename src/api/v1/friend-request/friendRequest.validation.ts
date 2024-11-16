import { body, param } from 'express-validator'
import userService from '../user/user.service'
import { Types } from 'mongoose'

const friendRequestValidation = {
    addFriend: [
        body('friendId')
            .notEmpty()
            .withMessage('thiếu trường friendId')
            .custom(async (value: string) => {
                if (!Types.ObjectId.isValid(value)) throw 'Invalid friendId'

                const user = await userService.getUser(value)
                if (!user) throw 'Không tồi tại người dùng để kết bạn'
            }),
        body('caption').notEmpty().withMessage('Thiếu trường caption')
    ],

    updateRequest: [
        param('requestId')
            .notEmpty()
            .withMessage('requestId')
            .custom(async (value: string) => {
                if (!Types.ObjectId.isValid(value)) throw 'Invalid requestId'
            }),
        body('status')
            .notEmpty()
            .withMessage('Thiếu trường status')
            .custom(async (value: string) => {
                if (!(value === 'ACCEPTED' || value === 'DECLINED'))
                    throw 'trường status phải có giá trị ACCEPTED hoặc DECLINED'
            })
    ]
}
export default friendRequestValidation
