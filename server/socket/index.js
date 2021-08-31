const { Socket } = require('socket.io');

let users = [];
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

		socket.on('join-room', room => {
			socket.join(room);
			console.log(`${socket.id} joined room ${room}`);

			// console.log(`Counter from server: ${counter}`);
			// socket.emit('time-position', counter);
			// fetch new trackqueue list = updatedTrackQueue
			// socket.emit('trackqueueUpdated', updatedTrackQueue)
		});

		socket.on('track-added', room => {
			console.log('a track has been added');
			console.log(room);
			// socket.to(room).broadcast.emit('refresh-tracks', room);
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
