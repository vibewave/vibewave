import React, { useState, useEffect } from 'react';
import { socket } from '../../socket/socket';
import { Container, Grid, Button, Link } from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-node';
import useStyles from './RoomStyle';
import Player from '../Player/Player';

const spotifyApi = new SpotifyWebApi({
	clientId: 'a28a1d73e5f8400485afaff5e584ca32',
});

const Room = () => {
	const classes = useStyles();

	const [isHost, setIsHost] = useState(false);
	const [currentTimePosition, setCurrentTimePosition] = useState(0);
	const [timeOfTimePositionFetch, setTimeOfTimePositionFetch] = useState(Date.now());

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

	socket.on('time-position', (counter) => {
		console.log('inside time-position client for user ', socket.id);
		console.log(`Current time: ${counter}`);
		setCurrentTimePosition(counter);
		setTimeOfTimePositionFetch(Date.now());
	});

	return (
		<Container
			component="div"
			disableGutters={true}
			maxWidth={false}
			className={classes.roomContainer}
		>
			<Grid container spacing={3} className={classes.mainGridContainer}>
				<Grid item xs={9} className={classes.roomCenter}>
					<div className={classes.roomCenterContainer}>
						<div className={classes.roomInfoDiv}>
							{isHost && 'I am the host'}
							{!isHost && 'I am not the host'}
							<button onClick={startSong}>Start Song</button>
							<button onClick={joinRoom}>Join Room</button>
							<div>{currentTimePosition}</div>
						</div>
						<div className={classes.mainArea}></div>
						<div className={classes.playerDiv}>
							<Player
								spotifyApi={spotifyApi}
								currentTimePosition={currentTimePosition}
								timeOfTimePositionFetch={timeOfTimePositionFetch}
							/>
						</div>
					</div>
					</Grid>
				<Grid item xs={3} className={classes.roomRight}></Grid>
			</Grid>
		</Container>
	);
}

export default Room;
