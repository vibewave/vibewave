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
		console.log(socket.id);

		users.push(socket.id);

		if (users.length === 1) {
			io.emit('isHost');
		}

		socket.on('send-message', (message, room) => {
			if (room === '') {
				socket.broadcast.emit('receive-message', message);
			} else {
				socket.to(room).emit('receive-message', message);
			}
		});

		socket.on('song-started', () => {
			counter = 0;
			console.log(`song started by ${socket.id}`);
			const counterInterval = setInterval(() => {
				counter += 100;
			}, 100);
			console.log(counter);
		});

		socket.on('reset-counter', (id, progress = 0, duration) => {
			if (roomIntervals[id]) {
				clearInterval(roomIntervals[id]);
			}
			console.log('inside reset counter server side');

			console.log('id in server is ', id);
			roomCounters[id].counter = progress;
			console.log(roomCounters);
			console.log(duration);
			roomIntervals[id] = setInterval(() => {
				roomCounters[id].counter += 100;
			}, 100);
		});

		// join the room on the server side
		socket.on('join-room', room => {
			socket.join(room);
			console.log(`${socket.id} joined room ${room}`);
		});

		//tell all other users in the room to refresh videos when a new song gets added
		socket.on('video-added', room => {
			socket.to(room).emit('refresh-videos', room);
		});

		//create a room counter whenever a new room is created
		socket.on('create-counter', roomId => {
			roomCounters[roomId] = { counter: 0 };
			console.log(roomCounters);
		});

		//a non-host user is seeking the time
		socket.on('seek', (roomId, socketId) => {
			console.log('in seek on server side');
			socket.emit('time-position-test', roomCounters[roomId].counter, socketId);
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
