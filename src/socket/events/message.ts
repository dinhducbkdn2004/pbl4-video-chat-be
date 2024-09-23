import { Socket } from 'socket.io'
import messageService from '~/api/v1/message/message.service'

export const clientSendMessageEvent = async (socket: Socket) => {
    socket.on('client-send-message', async (data) => {
        // const user = socket.handshake.auth
        // const { content, type, file, chatRoomId } = data
        // const message = await messageService.createMessage(user._id.toString(), content, chatRoomId, type, file)
        // console.log(message)
        // socket.emit('server-send-message', message)
    })
}
