import { io } from 'socket.io-client';
import store, {
	fetchVideos,
	fetchRequestedVideos,
	fetchMessages,
} from '../store';

export let socket;

if (process.env.NODE_ENV === 'production') {
	socket = io();
} else {
	socket = io('http://localhost:8086');
}

socket.on('connect', () => {});

socket.on('refresh-videos', room => {
	store.dispatch(fetchVideos(room));
});

socket.on('refresh-requested-videos', room => {
	store.dispatch(fetchRequestedVideos(room));
});

socket.on('refresh-message-list', (room, userId) => {
	store.dispatch(fetchMessages(room));
});
