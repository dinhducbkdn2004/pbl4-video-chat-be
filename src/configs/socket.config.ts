import { Server } from 'http'
import { Socket, Server as SocketIOServer } from 'socket.io'
import userService from '~/api/v1/user/user.service'
import authSocket from '~/socket/authSocket'
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

            socket.on(
                'start new call',
                async ({ userToCallSocketIds, from }: { userToCallSocketIds: string; from: string }) => {
                    const callee = await userService.getUser(userToCallSocketIds)
                    console.log(callee)

                    io.to(callee.socketId).emit('new video call', { from })
                }
            )
            socket.on('get my infor', () => {
                socket.emit('get my infor', user)
            })

            socket.on('answer a call', (data) => {
                io.to(data.to).emit('callee accecpted', data)
            })

            socket.on("callee's calling someone", ({ calleData, callerData }) => {
                io.to(callerData.socketId).emit("callee's calling someone", { calleData, callerData })
            })

            disconnectEvent(socket)
        } catch (error: any) {
            console.error('Connection error:', error.message)
            socket.disconnect(true)
        }
    })
}
export default initSocketIO
