import { param } from 'express-validator'
import userService from '../user/user.service'

const friendRequestInputDto = {
    addFriend: [
        param('friendId')
            .notEmpty()
            .withMessage('thiếu trường friendId')
            .custom(async (value: string) => {
                const user = await userService.getUser(value)
                if (!user) throw 'Không tồi tại người dùng để kết bạn'
            })
    ],

    updateRequest: [
        param('friendId')
            .notEmpty()
            .withMessage('thiếu trường friendId')
            .custom(async (value: string) => {
                const user = await userService.getUser(value)

                if (!user) throw 'Không tồi tại người dùng để kết bạn'
            })
        // query("status")
        //     .notEmpty()
        //     .withMessage("Thiếu trường status")
        //     .custom((value: string) => {
        //         const isCheck =
        //             value === "PENDING" ||
        //             value === "ACCEPTED" ||
        //             value === "DECLINED";

        //         if (!isCheck)
        //             throw "trường status phải có giá trị PENDING hoặc ACCEPTED hoặc DECLINED";
        //     }),
    ]
}
export default friendRequestInputDto
