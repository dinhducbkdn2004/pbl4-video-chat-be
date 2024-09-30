import { Socket } from 'socket.io'
import chatRoomService from '~/api/v1/chat-room/chatRoom.service'
import userService from '~/api/v1/user/user.service'
import { getIO } from '~/configs/socket.config'

const callVideoEvents = (socket: Socket) => {
    const io = getIO()
    socket.on('start new call', async ({ to, chatRoomId }: { to: string; chatRoomId: string }) => {
        const callee = await userService.getUser(to)

        const chatRoom = await chatRoomService.getChatRoomById(chatRoomId, callee._id.toString())

        io.to(callee.socketId).emit('new video call', { from: socket.handshake.auth._id, chatRoom })
    })
    socket.on('get my infor', () => {
        socket.emit('get my infor', socket.handshake.auth)
    })

    socket.on('answer a call', (data) => {
        io.to(data.to).emit('callee accecpted', data)
    })

    socket.on("callee's calling someone", ({ calleData, callerData }) => {
        io.to(callerData.socketId).emit("callee's calling someone", { calleData, callerData })
    })
}
export default callVideoEvents
