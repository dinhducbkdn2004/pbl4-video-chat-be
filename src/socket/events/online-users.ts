import { Socket } from 'socket.io'
const onlineUsers = new Map<string, { socketId: string; name: string; userId: string; avatar: string }>()
const onlineUsersEvent = (socket: Socket) => {
    const user = socket.handshake.auth
    const userId = user._id.toString()

    socket.emit('online-users', Array.from(onlineUsers.values()))

    if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, {
            socketId: socket.id,
            name: user.name,
            userId,
            avatar: user.avatar
        })
    }

    socket.broadcast.emit('online-users', Array.from(onlineUsers.values()))

    return onlineUsers
}
export default onlineUsersEvent
