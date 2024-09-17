import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server } from 'http';
import userService from '../controllers/user/services/user.service';
import authSocket from './authSocket';
import onlineUsersEvent from './events/online-users';

const initSocketIO = (httpServer: Server) => {
    const io: SocketIOServer = new SocketIOServer(httpServer, {
        cors: {
            origin: ['http://localhost:5173', 'https://pbl4-video-chat-fe.vercel.app'], // Allow this origin to connect
            methods: ['GET', 'POST'], // Allow specific HTTP methods
            allowedHeaders: ['Content-Type', 'authorization'], // Allow specific headers
            credentials: true // Allow credentials to be sent
        }
    });

    io.on('connection', async (socket: Socket) => {
        try {
            const user = await authSocket(socket);
            socket.handshake.auth = user;
            const userId = user._id.toString();

            // get online users
            const onlineUsers = onlineUsersEvent(socket);
            console.log('onlineUsers: ', onlineUsers);

            socket.on('client-send-friend-request', async (data: { recieverId: string; caption: string }) => {
                const newRequest = await userService.sendAddFriendRequest(userId, data.recieverId, data.caption);

                const senderSocketId = onlineUsers.get(data.recieverId)?.socketId as string;

                if (senderSocketId) socket.to(senderSocketId).emit('sever-send-friend-request', newRequest);
            });
            // Handle message sending
            socket.on('client-update-friend-request', async (senderId: string, status: 'ACCEPTED' | 'DECLINED') => {
                const data = await userService.updateFriendRequest(
                    senderId,
                    userId,

                    status
                );
                io.emit('sever-update-friend-request', data);
            });
            socket.on('client-send-message', (message: string) => {
                console.log(`Message from ${user.name}: ${message}`);
                // Broadcast message to all connected clients
                io.emit('server-send-message', { user: user.name, message });
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                console.log(`${user.name} disconnected`);
                onlineUsers.delete(userId); // Remove user from onlineUsers
                socket.broadcast.emit('online-users', Array.from(onlineUsers.values()));
                console.log(onlineUsers);
            });
        } catch (error: any) {
            console.error('Connection error:', error.message);
            socket.disconnect(true);
        }
    });
};
export default initSocketIO;
