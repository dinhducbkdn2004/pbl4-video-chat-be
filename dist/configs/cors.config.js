"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist = [
    "http://localhost:5173",
    "https://pbl4-video-chat-fe.vercel.app",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
exports.default = corsOptions;
