import { log } from 'console'
import { Server } from 'http'
import { Socket, Server as SocketIOServer } from 'socket.io'
import chatRoomModel from '~/api/v1/chat-room/chatRoom.model'
import chatRoomService from '~/api/v1/chat-room/chatRoom.service'
import userService from '~/api/v1/user/user.service'
import authSocket from '~/socket/authSocket'
import callVideoEvents from '~/socket/events/call-video-event'
import { disconnectEvent } from '~/socket/events/disconnect'
import onlineUsersEvent from '~/socket/events/online-users'

let io: SocketIOServer
export const getIO = () => io
const initSocketIO = (httpServer: Server) => {
    io = new SocketIOServer(httpServer, {
        cors: {
            origin: ['http://localhost:5173', 'https://pbl4-video-chat-fe.onrender.com'], // Allow this origin to connect
            methods: ['GET', 'POST'], // Allow specific HTTP methods
            allowedHeaders: ['Content-Type', 'authorization'], // Allow specific headers
            credentials: true // Allow credentials to be sent
        }
    })
    io.on('connection', async (socket: Socket) => {
        try {
            const user = await authSocket(socket)
            socket.handshake.auth = user

            await onlineUsersEvent(socket)

            await callVideoEvents(socket)

            disconnectEvent(socket)
        } catch (error: any) {
            console.error('Connection error:', error.message)
            socket.disconnect(true)
        }
    })
}
export default initSocketIO
