import React, { useState, useEffect } from 'react';
import { socket, host } from '../socket/socket';

export default function Room() {
	const [isHost, setIsHost] = useState(false);
	const [currentTimePosition, setCurrentTimePosition] = useState(0);

	socket.on('isHost', () => {
		setIsHost(true);
		console.log('isHost after connect is ', isHost);
	});

	const startSong = () => {
		console.log('start song button clicked.');
		socket.emit('song-started', true);
	};

	const joinRoom = () => {
		console.log('join room button clicked.');
		socket.emit('join-room');
	};

	socket.on('time-position', (counter: number) => {
		console.log('inside time-position client for user ', socket.id);
		console.log(`Current time: ${counter}`);
		setCurrentTimePosition(counter);
	});

	// let count = 0
	return (
		<div>
			{isHost && 'I am the host'}
			{!isHost && 'I am not the host'}
			<button onClick={startSong}>Start Song</button>
			<button onClick={joinRoom}>Join Room</button>
			<div>{currentTimePosition}</div>
		</div>
	);
}
