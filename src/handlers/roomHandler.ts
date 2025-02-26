import { Socket } from 'socket.io';
import { v4 as UUIDv4} from 'uuid';

export const roomHandler = ( socket: Socket ) => {
    const createRoom = () => {
        const roomId = UUIDv4(); //
        socket.join(roomId); // socket connection for entering a new room
        socket.emit('room-created', { roomId }); // here we'll emit an event
        console.log('room connected with id : ', roomId);
    };

    const joinedRoom = ({ roomId }: { roomId: string}) => {
        console.log('new user joined in room : ', roomId);
    };

    socket.on('create-room', createRoom);
    socket.on('joined-room', joinedRoom);
};
