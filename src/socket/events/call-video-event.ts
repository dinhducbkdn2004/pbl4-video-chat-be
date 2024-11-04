import { Socket } from 'socket.io'
import chatRoomService from '~/api/v1/chat-room/chatRoom.service'
import { getIO } from '~/configs/socket.config'
import userService from '../../api/v1/user/user.service'

const callVideoEvents = async (socket: Socket) => {
    const io = getIO()

    socket.on('caller:start_new_call', async ({ chatRoomId }: { chatRoomId: string }) => {
        try {
            console.log('caller:start_new_call')

            const user = await userService.getUser(socket.handshake.auth._id)
            user.isCalling = true
            await user.save()

            const chatRoom = await chatRoomService.getChatRoomById(chatRoomId)

            chatRoom.participants.forEach((participant) => {
                if (participant._id.toString() === socket.handshake.auth._id.toString()) return

                if (participant.isCalling) {
                    socket.emit('server:send_callee_response', {
                        result: 'decline',
                        from: participant,
                        chatRoomId,
                        message: `${participant.name} đang trong một cuộc gọi khác`
                    })
                    return
                }

                if (participant.isOnline === false) {
                    socket.emit('server:send_callee_response', {
                        result: 'decline',
                        from: participant,
                        chatRoomId,
                        message: `${participant.name} đang offline`
                    })
                    return
                }
                console.log('emit to:', participant)

                io.to(participant.socketId).emit('server:send_new_call', {
                    chatRoom,
                    from: user
                })
            })
        } catch (error: any) {
            console.error('Error in start new call:', error)
            socket.emit('error', { message: 'Unable to start a new call' })
        }
    })

    socket.on('user:leave_call', async () => {
        console.log('user:leave_call')
    })

    socket.on('callee:accept_call', async ({ chatRoomId, peerId }: { chatRoomId: string; peerId: string }) => {
        try {
            console.log('callee:accept_call')

            const user = await userService.getUser(socket.handshake.auth._id)
            user.isCalling = true
            await user.save()

            const chatRoom = await chatRoomService.getChatRoomById(chatRoomId)
            chatRoom.participants.forEach((participant) => {
                if (participant._id.toString() !== socket.handshake.auth._id.toString()) {
                    io.to(participant.socketId).emit('server:send_callee_response', {
                        result: 'accept',
                        from: socket.handshake.auth._id,
                        chatRoomId,
                        peerId,
                        message: `${socket.handshake.auth.name} has accepted your call`
                    })
                }
            })
        } catch (error) {
            console.log('callee:accept_call', error)
        }
    })

    socket.on('callee:cancel_call', async ({ chatRoomId, message }: { chatRoomId: string; message: string }) => {
        console.log('callee:cancel_call')

        const chatRoom = await chatRoomService.getChatRoomById(chatRoomId)
        chatRoom.participants.forEach((participant) => {
            if (participant._id.toString() !== socket.handshake.auth._id.toString()) {
                io.to(participant.socketId).emit('server:send_callee_response', {
                    result: 'decline',
                    from: socket.handshake.auth._id,
                    chatRoomId,
                    message
                })
            }
        })
    })
}

export default callVideoEvents
