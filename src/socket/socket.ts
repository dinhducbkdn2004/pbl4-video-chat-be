import { Server } from 'http'
import { Socket, Server as SocketIOServer } from 'socket.io'

import authSocket from './authSocket'
import onlineUsersEvent from './events/online-users'

import { disconnectEvent } from './events/disconnect'
import { clientSendMessageEvent } from './events/message'
let io: SocketIOServer
export const getIO = () => io
const initSocketIO = (httpServer: Server) => {
    io = new SocketIOServer(httpServer, {
        cors: {
            origin: ['http://localhost:5173', 'https://pbl4-video-chat-fe.vercel.app'], // Allow this origin to connect
            methods: ['GET', 'POST'], // Allow specific HTTP methods
            allowedHeaders: ['Content-Type', 'authorization'], // Allow specific headers
            credentials: true // Allow credentials to be sent
        }
    })

    io.on('connection', async (socket: Socket) => {
        try {
            const user = await authSocket(socket)
            socket.handshake.auth = user
            const userId = user._id.toString()

            const onlineUsers = await onlineUsersEvent(socket)

            // socket.on('client-send-friend-request', async (data: { recieverId: string; caption: string }) => {
            //     const newRequest = await friendRequestService.sendAddFriendRequest(
            //         userId,
            //         data.recieverId,
            //         data.caption
            //     )

            //     const senderSocketId = onlineUsers.get(data.recieverId)?.socketId as string

            //     if (senderSocketId) socket.to(senderSocketId).emit('sever-send-friend-request', newRequest)
            // })
            // // Handle message sending
            // socket.on('client-update-friend-request', async (senderId: string, status: 'ACCEPTED' | 'DECLINED') => {
            //     const data = await friendRequestService.updateFriendRequest(
            //         senderId,
            //         userId,

            //         status
            //     )
            //     io.emit('sever-update-friend-request', data)
            // })

            // Handle disconnection
            disconnectEvent(socket, onlineUsers)
        } catch (error: any) {
            console.error('Connection error:', error.message)
            socket.disconnect(true)
        }
    })
}
export default initSocketIO
