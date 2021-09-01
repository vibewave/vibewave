const { Socket } = require('socket.io');

let users = [];
let roomCounters = { 1: { counter: 0 }, 2: { counter: 0 } };
// export const trackQueueOrder = {};

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

		socket.on('reset-counter', (id, duration) => {
			console.log('inside reset counter server side');
			console.log(roomCounters);
			console.log('id in server is ', id);
			roomCounters[id].counter = 0;
			const counterInterval = setInterval(() => {
				roomCounters[id].counter += 100;
			}, 100);
		});

		// join the room on the server side
		socket.on('join-room', room => {
			socket.join(room);
			console.log(`${socket.id} joined room ${room}`);
		});

		//tell all other users in the room to refresh tracks when a new song gets added
		socket.on('track-added', room => {
			socket.to(room).emit('refresh-tracks', room);
		});

		//create a room counter whenever a new room is created
		socket.on('create-counter', roomId => {
			roomCounters[roomId] = { counter: 0 };
			console.log(roomCounters);
		});

		//a non-host user is seeking the time
		socket.on('seek', (roomId, socketId) => {
			console.log('in seek on server side');
			console.log(roomId);
			console.log(socketId);
			socket.emit('time-position-test', roomCounters[roomId].counter, socketId);
		});

		socket.on('disconnect', () => {
			users = users.filter(user => user !== socket.id);
			console.log('users after dc ', users);
		});

		// SOCKET LISTENERS FOR TRACKQUEUE UPDATES:

		//socket.on('trackAdded', () => {
		// add track to database
		// fetch new trackqueue list = updatedTrackQueue
		// socket.emit('trackqueueUpdated', updatedTrackQueue) -> emit to the room updatedTrackQueue (trackqueue updated event)
		//})

		//socket.on('trackPopped', () => {
		// remove the track (by id) in database
		// fetch new trackqueue list = updatedTrackQueue
		// socket.emit('trackqueueUpdated', updatedTrackQueue) -> emit to the room updatedTrackQueue (trackqueue updated event)
		//})
	});
};

module.exports = startSocket;
