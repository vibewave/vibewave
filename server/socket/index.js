const { Socket } = require('socket.io');

let users = [];
let roomCounters = { 1: { counter: 0 }, 2: { counter: 0 } };
let roomIntervals = {};
// const clearRoomInterval = id => {
// 	clearInterval();
// };
// export const videoQueueOrder = {};

const startSocket = io => {
	let counter = 0;
	const hardValue = 5;

	io.on('connection', socket => {
		console.log(socket.id, 'has connected');
		users.push(socket.id);

		socket.on('send-message', (message, room) => {
			if (room === '') {
				socket.broadcast.emit('receive-message', message);
			} else {
				socket.to(room).emit('receive-message', message);
			}
		});

		// join the room on the server side
		socket.on('join-room', roomId => {
			socket.join(roomId);
			console.log(`${socket.id} joined room ${roomId}`);
		});

		socket.on('leave-room', roomId => {
			socket.leave(roomId);
			console.log(`${socket.id} left room ${roomId}`);
		});

		//tell all other users in the room to refresh videos when a new song gets added
		socket.on('video-added', roomId => {
			socket.to(roomId).emit('refresh-videos', roomId);
		});

		//current time related sockets
		socket.on('request-currentTime', (roomId, userId) => {
			socket.to(roomId).emit('get-currentTime-from-host', userId);
		});

		socket.on('send-currentTime', (roomId, userId, currentTime) => {
			socket.to(roomId).emit('currentTime', userId, currentTime);
		});

		//handling closing room
		socket.on('host-closed-room', roomId => {
			socket.to(roomId).emit('room-closing');
		});

		socket.on('disconnect', () => {
			users = users.filter(user => user !== socket.id);
			console.log('users after dc ', users);
		});
		//new message being sent
		socket.on('new-message', (room, userId) => {
			console.log('inside new message');
			console.log('userId', userId);
			socket.to(room).emit('refresh-message-list', room, userId);
		});
	});
};

module.exports = startSocket;
