import { Socket } from 'socket.io'
import userService from '~/api/v1/user/user.service'

export const disconnectEvent = async (socket: Socket) => {
    socket.on('disconnect', async () => {
        console.log('User disconnected:', socket.handshake.auth.name)

        const user = await userService.getUser(socket.handshake.auth._id)

        const onlineFriends = await userService.getOnlineFriends(user._id.toString())

        user.socketId = user.socketId.filter((id) => id !== socket.id)
        user.isOnline = user.socketId.length !== 0
        if (!user.isOnline)
            onlineFriends.forEach((friend) => {
                socket.to(friend.socketId).emit('disconnect friend', user)
            })

        await user.save()
    })
}
