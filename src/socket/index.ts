import { Server as SocketIOServer, Socket } from "socket.io";
import { Server } from "http";
const initSocketIO = (httpServer: Server) => {
    const io: SocketIOServer = new SocketIOServer(httpServer);

    io.on("connection", (socket: Socket) => {
        console.log("A user connected: ", socket.id);

        // Handle socket events
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};
export default initSocketIO;
