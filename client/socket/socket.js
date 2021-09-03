import { io } from 'socket.io-client';
import store, { fetchVideos, fetchMessages } from '../store';

export let socket;

if (process.env.NODE_ENV === 'production') {
	socket = io();
} else {
	socket = io('http://localhost:8086');
}

socket.on('connect', () => {
	console.log(`Connected with id: ${socket.id}`);
});

socket.on('refresh-videos', room => {
	console.log('inside of refresh videos');
	store.dispatch(fetchVideos(room));
});

socket.on('refresh-message-list', (room, userId) => {
	console.log('inside of refresh messages', userId);

	store.dispatch(fetchMessages(room));
});

// function

// let currentTimePosition = 0;

// socket.on('time-position', counter => {
// 	// console.log('inside time-position client for user ', socket.id);
// 	console.log(`Current time: ${counter}`);
// 	currentTimePosition = counter;
// });
// export { currentTimePosition }

// on user joining room, then seek to current position of player
// socket.on('time-position', (counter) => {
//   // spotifyApi.seek(counter);
// });
