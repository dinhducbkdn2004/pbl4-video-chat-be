import { Socket } from 'socket.io'
import userService from '~/api/v1/user/user.service'

export const disconnectEvent = async (socket: Socket) => {
    socket.on('disconnect', async () => {
        const user = await userService.getUser(socket.handshake.auth._id)

        const onlineFriends = await userService.getOnlineFriends(user._id.toString())

        onlineFriends.forEach((friend) => {
            socket.to(friend.socketId).emit('disconnect friend', user)
        })
        user.socketId = user.socketId.filter((id) => id !== socket.id)
        user.isOnline = user.socketId.length !== 0

        await user.save()
    })
}
