"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const user_service_1 = __importDefault(require("../controllers/user/services/user.service"));
const authSocket_1 = __importDefault(require("./authSocket"));
const onlineUsers = new Map();
const initSocketIO = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: [
                "http://localhost:5173, https://pbl4-video-chat-fe.vercel.app",
            ], // Allow this origin to connect
            methods: ["GET", "POST"], // Allow specific HTTP methods
            allowedHeaders: ["Content-Type"], // Allow specific headers
            credentials: true, // Allow credentials to be sent
        },
    });
    io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, authSocket_1.default)(socket);
            // Add user to the onlineUsers map
            const userId = user._id.toString();
            onlineUsers.set(userId, {
                socketId: socket.id,
                name: user.name,
            });
            console.log(`${user.name} connected`);
            socket.broadcast.emit("online-users", Array.from(onlineUsers.values()));
            socket.on("client-send-friend-request", (receiverId) => __awaiter(void 0, void 0, void 0, function* () {
                const newRequest = yield user_service_1.default.sendAddFriendRequest(userId, receiverId);
                io.emit("sever-send-friend-request", newRequest);
            }));
            // Handle message sending
            socket.on("client-update-friend-request", (receiverId, status) => __awaiter(void 0, void 0, void 0, function* () {
                const data = yield user_service_1.default.updateFriendRequest(userId, receiverId, status);
                io.emit("sever-update-friend-request", data);
            }));
            socket.on("client-send-message", (message) => {
                console.log(`Message from ${user.name}: ${message}`);
                // Broadcast message to all connected clients
                io.emit("server-send-message", { user: user.name, message });
            });
            // Handle disconnection
            socket.on("disconnect", () => {
                console.log(`${user.name} disconnected`);
                onlineUsers.delete(userId); // Remove user from onlineUsers
                socket.broadcast.emit("online-users", Array.from(onlineUsers.values()));
                console.log(onlineUsers);
            });
        }
        catch (error) {
            console.error("Connection error:", error.message);
            socket.disconnect(true);
        }
    }));
};
exports.default = initSocketIO;
//# sourceMappingURL=index.js.map