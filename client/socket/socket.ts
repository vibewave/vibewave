import { io } from 'socket.io-client';


const socket = io('http://localhost:8086');

let currentTimePosition = 0;
let room = 'currentRoomId';

socket.on('connect', () => {
  console.log(`Connected with id: ${socket.id}`);


  socket.emit('songStarted', true);

  socket.emit('user-joined-room', room);
});

socket.on('time-position', (counter) => {
  spotifyApi.seek(counter);
})
