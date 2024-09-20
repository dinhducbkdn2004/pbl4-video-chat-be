import userModel from '../user.model'

const searchUsers = async (name: string, page: number = 1, limit = 10) => {
    const searchRegex = new RegExp(name, 'i')
    const skip = (page - 1) * limit

    const users = await userModel.find({ name: searchRegex }).select('name email avatar').skip(skip).limit(limit)

    return {
        users
    }
}

export default searchUsers
