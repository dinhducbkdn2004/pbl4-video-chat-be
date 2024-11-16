import { body, param, query } from 'express-validator'

export const groupRequestValidation = {
    getAllRequest: [query('chatRoomId').isMongoId().withMessage('chatRoomId không hợp lệ')],
    create: [
        body('chatRoomId').isMongoId().withMessage('chatRoomId không hợp lệ'),

        body('message').notEmpty().withMessage('caption không hợp lệ')
    ],
    update: [
        param('requestId').isMongoId().withMessage('requestId không hợp lệ'),
        body('status')
            .isIn(['ACCEPTED', 'DECLINED', 'CANCELED'])
            .withMessage('status không hợp lệ (ACCEPTED, DECLINED hoặc CANCELED)')
    ]
}
