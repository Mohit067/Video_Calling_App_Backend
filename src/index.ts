import express from 'express';
import http from 'http';
import serverConfig from './config/serverConfig';
import { Server } from 'socket.io';
import cors from "cors";

const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("new user connect");

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
});

server.listen(serverConfig.PORT, () => {
    console.log(`server is running on ${serverConfig.PORT}`);
});
