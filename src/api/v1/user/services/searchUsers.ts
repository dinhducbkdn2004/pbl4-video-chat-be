import { validation } from '~/helpers/validation'
import userModel from '../user.model'
import { getPagination } from '~/helpers/pagination'

const searchUsers = async (name: string, page: number = 1, limit: number = 10) => {
    const isEmail = validation.containsEmail(name)
    console.log('isEmail: ', isEmail)

    type SearchOption = {
        name?: RegExp
        email?: string
    }
    let searchOption: SearchOption
    isEmail ? (searchOption = { email: name }) : (searchOption = { name: new RegExp(name, 'i') })

    const pagination = getPagination(page, limit)

    const users = await userModel
        .find(searchOption)
        .select('-socketId -notifications -account -chatRooms')
        .skip(pagination.skip)
        .limit(pagination.limit)

    return users
}

export default searchUsers
