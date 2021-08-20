import { io } from 'socket.io-client';

export const socket = io('http://localhost:8086');

export let host = {isHost: false}


let currentTimePosition = 0;
let room = 'currentRoomId';

socket.on('connect', () => {
  console.log(`Connected with id: ${socket.id}`);
});

// if (isHost && trackUri changed)
  socket.emit('songStarted', true);

// on Room click:
// socket.emit('join-room', socket.id);

// socket.on('isHost', ()=> {
//   host.isHost = true;
//   console.log('isHost after connect is ' , host.isHost);
// })

// on user joining room, then seek to current position of player
// socket.on('time-position', (counter) => {
//   // spotifyApi.seek(counter);
// });
