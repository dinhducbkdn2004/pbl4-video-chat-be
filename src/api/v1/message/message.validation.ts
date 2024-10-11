import { body, param, query } from 'express-validator'

const messageValidation = {
    getSeoData: [query('url').notEmpty()],
    getByRoomchatId: [
        query('chatRoomId')
            .notEmpty()
            .withMessage('Chat room ID is required')
            .isMongoId()
            .withMessage('Chat room ID must be a valid MongoDB ID')
    ],
    createMessage: [
        body('type')
            .notEmpty()
            .withMessage('Thiếu trường type')
            .custom(async (value) => {
                const isTypeEnum =
                    value === 'Video' ||
                    value === 'Text' ||
                    value === 'Picture' ||
                    value === 'Document' ||
                    value === 'Link'

                if (!isTypeEnum) throw "type là enum('Text' | 'Picture' | 'Document' | 'Link' | 'Video')"
            }),
        body('chatRoomId')
            .notEmpty()
            .withMessage('Thiếu trường chatRoomId')
            .isMongoId()
            .withMessage('Invalid chatroom Id')
    ]
}
export default messageValidation
