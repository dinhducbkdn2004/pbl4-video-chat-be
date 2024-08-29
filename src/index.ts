import express, { Request, Response, Express } from "express";

import routes from "./routes";
import bodyParser from "body-parser";
import connectDb from "./configs/database.config";
import { createServer, Server } from "http";
import { Socket, Server as SocketIOServer } from "socket.io";
import env from "./configs/env";
import corsOptions from "./configs/cors.config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();

const PORT: string | number = env.PORT || 3000;

// Connect to the database
connectDb();

// Middleware setup
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use("/api/v1", routes);

// Create HTTP server
const httpServer: Server = createServer(app);

// Set up Socket.IO
const io: SocketIOServer = new SocketIOServer(httpServer);

io.on("connection", (socket: Socket) => {
    console.log("A user connected: ", socket.id);

    // Handle socket events
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });

    // You can add more events here
});

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
