import { log } from 'console'
import { Socket } from 'socket.io'
import chatRoomService from '~/api/v1/chat-room/chatRoom.service'
import { IUser } from '~/api/v1/user/user.model'
import userService from '~/api/v1/user/user.service'
import { getIO } from '~/configs/socket.config'

const callVideoEvents = async (socket: Socket) => {
    const io = getIO()
    socket.on('start new call', async ({ to, chatRoomId }: { to: string; chatRoomId: string }) => {
        try {
            const callee = await userService.getUser(to)

            const chatRoom = await chatRoomService.getChatRoomById(chatRoomId, callee._id.toString())

            io.to(callee.socketId).emit('new video call', { from: socket.handshake.auth._id, chatRoom })
        } catch (error: any) {
            console.error('Error in start new call:', error.message)
            socket.emit('error', { message: 'Unable to start a new call' })
        }
    })
    socket.on('get my infor', () => {
        socket.emit('get my infor', socket.handshake.auth)
    })

    socket.on('answer a call', ({ to, peerId }) => {
        console.log(
            to.participants
                .filter((participant: IUser) => participant._id !== socket.handshake.auth._id.toString())
                .map((participant: IUser) => participant.socketId),
            peerId
        )

        io.to(
            to.participants
                .filter((participant: IUser) => participant._id !== socket.handshake.auth._id.toString())
                .map((participant: IUser) => participant.socketId)
        ).emit('callee accept call', { peerId })
    })

    socket.on("callee's calling someone", ({ calleData, callerData }) => {
        try {
            io.to(callerData.socketId).emit("callee's calling someone", { calleData, callerData })
        } catch (error) {
            log(error)
        }
    })
}
export default callVideoEvents
