import { body, param, query } from 'express-validator'

const messageValidation = {
    getByRoomchatId: [
        query('chatRoomId')
            .notEmpty()
            .withMessage('Chat room ID is required')
            .isMongoId()
            .withMessage('Chat room ID must be a valid MongoDB ID')
    ],
    createMessage: [
        body('content')
            .notEmpty()
            .withMessage('Thiếu trường content')
            .isString()
            .withMessage('content must be a string'),
        body('type')
            .notEmpty()
            .withMessage('Thiếu trường type')
            .custom(async (value) => {
                const isTypeEnum = value === 'Text' || value === 'Media' || value === 'Document' || value === 'Link'

                if (!isTypeEnum) throw "type là enum('Text' | 'Media' | 'Document' | 'Link')"
            }),
        body('chatRoomId')
            .notEmpty()
            .withMessage('Thiếu trường chatRoomId')
            .isMongoId()
            .withMessage('Invalid chatroom Id')
    ]
}
export default messageValidation
