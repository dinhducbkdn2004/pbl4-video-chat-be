import { body } from 'express-validator'

const notificationValidation = {
    updateNotification: [
        body('notificationId')
            .notEmpty()
            .withMessage('trường notificationId không được để trống')
            .isMongoId()
            .withMessage('notificationId không đúng định dạng')
    ]
}
export default notificationValidation
