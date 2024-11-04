import { log } from 'console'
import { Socket } from 'socket.io'
import userService from '~/api/v1/user/user.service'
import { getIO } from '~/configs/socket.config'

export const disconnectEvent = async (socket: Socket) => {
    socket.on('disconnect', async () => {
        const user = await userService.getUser(socket.handshake.auth._id)

        const onlineFriends = await userService.getOnlineFriends(user._id.toString())
        
        onlineFriends.forEach((friend) => {
            socket.to(friend.socketId).emit('disconnect friend', user)
        })

        user.isOnline = false
        user.socketId = user.socketId.filter((id) => id !== socket.id)
        await user.save()
    })
}
