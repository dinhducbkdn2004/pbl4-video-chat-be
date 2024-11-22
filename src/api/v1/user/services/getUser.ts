import chatRoomService from '../../chat-room/chatRoom.service'
import userModel from '../user.model'

const getUser = async (userId: string) => {
    const user = await userModel.findById(userId).select('-account -notifications -chatRooms -friends') // Lấy user theo ID

    if (!user) throw 'User not found!'
    return user
}

export const getAllUsers = async (userId: string) => {
    const currentUser = await userModel.findById(userId).select('friends')
    if (!currentUser) {
        throw new Error('Người dùng không tồn tại')
    }

    const users = await userModel
        .find({ _id: { $ne: userId } }) // Loại trừ chính mình
        .select('-account -notifications -chatRooms -friends') // Loại bỏ các trường không cần thiết

    const friendsSet = new Set(currentUser.friends.map((friend) => friend.toString())) // Chuyển danh sách bạn bè thành Set để tối ưu tra cứu
    const result = users.map((user) => ({
        ...user.toObject(),
        isFriend: friendsSet.has(user._id.toString()) // Kiểm tra nếu là bạn bè
    }))

    return result
}

export default getUser
