import chatRoomService from '../../chat-room/chatRoom.service'
import userModel from '../user.model'

const getUser = async (userId: string) => {
    const user = await userModel.findById(userId).select('-account -notifications -chatRooms -friends') // Lấy user theo ID

    if (!user) throw 'User not found!'
    return user
}
export const getAllUsers = async () => {
    const user = await userModel.find().select('-account -notifications -chatRooms -friends')
    return user
}
export default getUser
