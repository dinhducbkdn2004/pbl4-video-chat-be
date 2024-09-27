import { log } from 'console'
import { Document, Types } from 'mongoose'
import { Socket } from 'socket.io'
import userModel from '~/api/v1/user/user.model'
import userService from '~/api/v1/user/user.service'

export const disconnectEvent = async (socket: Socket) => {
    socket.on('disconnect', async () => {
        const user = socket.handshake.auth
        const onlineFriends = await userService.getOnlineFriends(user._id)
        console.log(`${user.name} disconnected`)
        socket.to(onlineFriends.map((user) => user.socketId)).emit('disconnect friend', user)

        user.isOnline = false
        user.socketId = null
        await user.save()
    })
}
