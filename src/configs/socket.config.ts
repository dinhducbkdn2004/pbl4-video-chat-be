import { log } from 'console'
import { Server } from 'http'
import { Socket, Server as SocketIOServer } from 'socket.io'
import chatRoomModel from '~/api/v1/chat-room/chatRoom.model'
import chatRoomService from '~/api/v1/chat-room/chatRoom.service'
import userService from '~/api/v1/user/user.service'
import authSocket from '~/socket/authSocket'
import callVideoEvents from '~/socket/events/call-video-event'
import { disconnectEvent } from '~/socket/events/disconnect'
import { messageEvent } from '~/socket/events/message-event'
import onlineUsersEvent from '~/socket/events/online-users'

let io: SocketIOServer
export const getIO = () => io
const initSocketIO = (httpServer: Server) => {
    io = new SocketIOServer(httpServer, {
        cors: {
            origin: [
                'http://localhost:5173',
                'https://pbl4-video-chat-fe.onrender.com',
                'http://172.188.113.94:5173',
                'http://ducbkdn.space',
                'https://ducbkdn.space',
                'http://www.ducbkdn.space',
                'https://www.ducbkdn.space',
            ], 
            methods: ['GET', 'POST'], // Allow specific HTTP methods
            allowedHeaders: ['Content-Type', 'authorization'], // Allow specific headers
            credentials: true // Allow credentials to be sent
        }
    })
    io.on('connection', async (socket: Socket) => {
        try {
            await authSocket(socket)
            await onlineUsersEvent(socket)
            await messageEvent(socket)
            await callVideoEvents(socket)
            await disconnectEvent(socket)
        } catch (error: any) {
            console.error('Connection error:', error.message)
            socket.disconnect(true)
        }
    })
}
export default initSocketIO