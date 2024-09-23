import userModel from '../user.model'

export const getOnlineFriends = async (userId: string) => {
    const user = await userModel.findById(userId).select('friends')

    if (!user || !user.friends) {
        return []
    }

    // Tìm tất cả các bạn bè có isOnline = true trong danh sách friends của user
    const onlineFriends = await userModel
        .find({
            _id: { $in: user.friends }, // Lọc theo danh sách bạn bè
            isOnline: true // Lọc những bạn bè đang online
        })
        .select('name avatar')
    return onlineFriends
}
