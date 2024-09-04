import { Server as SocketIOServer, Socket } from "socket.io";
import { Server } from "http";

import { verifyAccessToken } from "../helpers/jwtToken";
import userService from "../controllers/user/services/user.service";
const onlineUsers = new Map<string, { socketId: string; name: string }>();
const initSocketIO = (httpServer: Server) => {
    const io: SocketIOServer = new SocketIOServer(httpServer, {
        cors: {
            origin: "http://localhost:5173", // Allow this origin to connect
            methods: ["GET", "POST"], // Allow specific HTTP methods
            allowedHeaders: ["Content-Type"], // Allow specific headers
            credentials: true, // Allow credentials to be sent
        },
    });

    io.on("connection", async (socket: Socket) => {
        try {
            const accessToken = socket.handshake.headers.authorization;
            if (!accessToken) throw new Error("No authentication");
            const decode = verifyAccessToken(accessToken as string);
            const { userId } =
                typeof decode === "string" ? { userId: decode } : decode.data;
            const user = await userService.getMe(userId);

            // Add user to the onlineUsers map
            onlineUsers.set(userId, { socketId: socket.id, name: user.name });

            console.log(`${user.name} connected`);

            socket.broadcast.emit(
                "online-users",
                Array.from(onlineUsers.values())
            );

            socket.on(
                "client-send-friend-request",
                async (receiverId: string) => {
                    const newRequest = await userService.sendAddFriendRequest(
                        userId,
                        receiverId
                    );

                    io.emit("sever-send-friend-request", newRequest);
                }
            );
            // Handle message sending
            socket.on(
                "client-update-friend-request",
                async (receiverId: string, status: "ACCEPTED" | "DECLINED") => {
                    const data = await userService.updateFriendRequest(
                        userId,
                        receiverId,
                        status
                    );
                    io.emit("sever-update-friend-request", data);
                }
            );
            socket.on("client-send-message", (message: string) => {
                console.log(`Message from ${user.name}: ${message}`);
                // Broadcast message to all connected clients
                io.emit("server-send-message", { user: user.name, message });
            });

            // Handle disconnection
            socket.on("disconnect", () => {
                console.log(`${user.name} disconnected`);
                onlineUsers.delete(userId); // Remove user from onlineUsers
                socket.broadcast.emit(
                    "online-users",
                    Array.from(onlineUsers.values())
                );
                console.log(onlineUsers);
            });
        } catch (error: any) {
            console.error("Connection error:", error.message);
            socket.disconnect(true);
        }
    });
};
export default initSocketIO;
