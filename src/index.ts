import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import serverConfig from './config/serverConfig';
import { roomHandler } from './handlers/roomHandler';

const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('new user connect');
    roomHandler(socket); // pass the socket connetion to roomHandler to create and join in a room
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(serverConfig.PORT, () => {
    console.log(`server is running on ${serverConfig.PORT}`);
});
