import { Socket } from 'socket.io'
import userModel from '~/api/v1/user/user.model'
import friendRequestService from '~/api/v1/friend-request/friendRequest.service'

export const friendRequestEvent = async (socket: Socket, onlineUser: any[]) => {
    socket.on('addFriend', async ({ friendId, caption }) => {
        const sender = socket.handshake.auth
        const newRequest = await friendRequestService.sendAddFriendRequest(sender._id, friendId, caption)

        const friendSocket = onlineUser.find((user) => user._id.toString() === friendId)?.socketId
        if (friendSocket) {
            socket.to(friendSocket).emit('new friend request', newRequest)
        }
        socket.emit('friend request sent', newRequest)
    })
}
