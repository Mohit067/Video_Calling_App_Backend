import { Socket } from 'socket.io';
import { v4 as UUIDv4} from 'uuid';
import RoomsParams from '../interfaces/RoomParams';

const rooms: Record<string, string[]> = {};

export const roomHandler = ( socket: Socket ) => {

    
    const createRoom = () => {
        const roomId = UUIDv4();

        socket.join(roomId); // socket connection for entering a new room
        rooms[roomId] = []; // create the new entery for the room
        socket.emit('room-created', { roomId }); // here we'll emit an event
        console.log('room connected with id : ', roomId);
    };

    const joinedRoom = ({ roomId, peerId }: RoomsParams) => {
        console.log('joined room called', rooms);

        if (rooms[roomId]) {
            console.log('new user joined in room : ', roomId, 'with peerId is', peerId);
            rooms[roomId].push(peerId);
            console.log('added peer to room', rooms);
            socket.join(roomId);
        }

        socket.emit('get-users', {
            roomId,
            participants: rooms[roomId],
        });
    };

    socket.on('create-room', createRoom);
    socket.on('joined-room', joinedRoom);
};
