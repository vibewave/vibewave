import { io } from 'socket.io-client';

export let socket;

if (process.env.NODE_ENV === 'production') {
	socket = io();
} else {
	socket = io('http://localhost:8086');
}

socket.on('connect', () => {
	console.log(`Connected with id: ${socket.id}`);
});

// on user joining room, then seek to current position of player
// socket.on('time-position', (counter) => {
//   // spotifyApi.seek(counter);
// });
