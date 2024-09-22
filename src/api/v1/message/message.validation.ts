import { param, query } from 'express-validator'

const messageValidation = {
    getByRoomchatId: [
        query('chatRoomId')
            .notEmpty()
            .withMessage('Chat room ID is required')
            .isMongoId()
            .withMessage('Chat room ID must be a valid MongoDB ID')
    ]
}
export default messageValidation
