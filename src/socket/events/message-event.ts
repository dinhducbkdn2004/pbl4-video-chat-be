import { Socket } from 'socket.io'
import userModel, { IUser } from '~/api/v1/user/user.model'
import friendRequestService from '~/api/v1/friend-request/friendRequest.service'
import chatRoomModel from '~/api/v1/chat-room/chatRoom.model'
import chatRoomService from '~/api/v1/chat-room/chatRoom.service'
import { getIO } from '~/configs/socket.config'

export const messageEvent = async (socket: Socket) => {
    const io = getIO()
    socket.on('user:change-message', async ({ chatRoomId, user }: { chatRoomId: string; user: IUser }) => {
        console.log('user:change-message')

        const chatRoom = await chatRoomService.getChatRoomById(chatRoomId)
        chatRoom.participants.forEach((participant) => {
            if (participant.isOnline) {
                io.to(participant.socketId).emit('sever:user-start-typing', {
                    chatRoomId,
                    user
                })
            }
        })
    })

    socket.on('user:stop-change-message', async ({ chatRoomId, user }: { chatRoomId: string; user: IUser }) => {
        console.log('user:stop-change-message')
        const chatRoom = await chatRoomService.getChatRoomById(chatRoomId)
        chatRoom.participants.forEach((participant) => {
            if (participant.isOnline) {
                io.to(participant.socketId).emit('sever:user-stop-typing', {
                    user,
                    chatRoomId
                })
            }
        })
    })
}
