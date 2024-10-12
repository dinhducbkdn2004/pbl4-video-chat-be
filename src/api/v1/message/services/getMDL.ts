import { create } from 'domain'
import messageModel from '../message.model'
import { getPagination } from '~/helpers/pagination'

const getMDL = async (chatRoomId: string, page: number, limit: number, type: 'Media' | 'Document' | 'Link') => {
    const pagination = getPagination(page, limit)

    let typeCondition: string[] = []

    if (type === 'Media') {
        typeCondition = ['Picture', 'Video']
    } else if (type === 'Document') {
        typeCondition = ['Document']
    } else if (type === 'Link') {
        typeCondition = ['Link']
    }

    if (!type) {
        throw new Error('Type truyền vào không hợp lệ')
    }

    const messages = await messageModel
        .find({
            chatRoom: chatRoomId,
            type: { $in: typeCondition }
        })
        .sort({ createAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .exec()

    return messages
}

export default getMDL
