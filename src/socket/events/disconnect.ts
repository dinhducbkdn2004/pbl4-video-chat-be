import { log } from 'console'
import { Document, Types } from 'mongoose'
import { Socket } from 'socket.io'
import userModel from '~/api/v1/user/user.model'

export const disconnectEvent = async (socket: Socket, onlineUser: any[]) => {
    socket.on('disconnect', async () => {
        const user = socket.handshake.auth

        console.log(`${user.name} disconnected`)
        socket.to(onlineUser.map((user) => user.socketId)).emit('disconnect friend', user)

        user.isOnline = false
        user.socketId = null
        await user.save()
    })
}
