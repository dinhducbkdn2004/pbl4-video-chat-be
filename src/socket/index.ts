import { Server as SocketIOServer, Socket } from "socket.io";
import { Server } from "http";
const initSocketIO = (httpServer: Server) => {
    const io: SocketIOServer = new SocketIOServer(httpServer, {
        cors: {
            origin: "http://localhost:5173", // Allow this origin to connect
            methods: ["GET", "POST"], // Allow specific HTTP methods
            allowedHeaders: ["Content-Type"], // Allow specific headers
            credentials: true, // Allow credentials to be sent
        },
    });

    io.on("connection", (socket: Socket) => {
        const { accessToken, userId, name } = socket.handshake.query;
        console.log("A user connected: ", { name, accessToken, userId });

        socket.on("send-message", (message: string) => {
            console.log(message);
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};
export default initSocketIO;
