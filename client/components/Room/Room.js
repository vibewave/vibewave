import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SpotifyWebApi from 'spotify-web-api-node';
import useStyles from './RoomStyle';
import TrackSearch from '../TrackSearch/TrackSearch';
import TrackQueue from '../TrackQueue/TrackQueue';
import Player from '../Player/Player';
import { getRoom, removeTrack } from '../../store';

const spotifyApi = new SpotifyWebApi({
	clientId: 'a28a1d73e5f8400485afaff5e584ca32',
});

const Room = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { id } = useParams();
	const user = useSelector(state => state.auth);
	const room = useSelector(state => state.room);

	const [isHost, setIsHost] = useState(false);
	const [currentTimePosition, setCurrentTimePosition] = useState(0);

	useEffect(() => {
		dispatch(getRoom(id));
		return () => {};
	}, []);

	// CALL THESE INSIDE A USEEFFECT:

	// const emitTrackPopped = () => {
	// 	socket.emit('trackPopped');
	// }

	// const updateTracks = () => {
	// 	socket.on('trackQueueUpdated', (updatedTrackQueue) => {
	// 		if (updatedTrackQueue !== trackQueue) {
	//			setTrackQueue(updatedTrackQueue);
	//    }
	//  });
	// }

	useEffect(() => {
		if (room.id) {
			// joinRoom();
			if (user.id === room.hostId) {
				setIsHost(true);
			} else {
				console.log('joined the room');
			}
		}
		return () => {};
	}, [room.id]);

	useEffect(() => {
		getTimePosition();
		return () => {};
	}, []);

	const startSong = () => {
		console.log('start song button clicked.');
		socket.emit('song-started', true);
	};

	// const joinRoom = () => {
	// 	socket.emit('join-room');
	// };

	const getTimePosition = () => {
		socket.on('time-position', counter => {
			console.log('inside time-position client for user ', socket.id);
			console.log(`Current time: ${counter}`);
			setCurrentTimePosition(counter);
		});
	};

	return (
		<Container
			component="div"
			disableGutters={true}
			maxWidth={false}
			className={classes.roomContainer}
		>
			<Grid container className={classes.mainGridContainer}>
				<Grid item xs={2} className={classes.roomLeft}>
					<div className={classes.trackQueueContainer}>
						<TrackQueue />
					</div>
				</Grid>
				<Grid item xs={7} className={classes.roomCenter}>
					<div className={classes.roomCenterContainer}>
						<div className={classes.roomInfoDiv}>
							{isHost && 'I am the host'}
							{!isHost && 'I am not the host'}
							<button onClick={startSong}>Start Song</button>
							{/* <button onClick={joinRoom}>Join Room</button> */}
							<div>{currentTimePosition}</div>
						</div>
						<div className={classes.mainArea}>
							{isHost && <TrackSearch spotifyApi={spotifyApi} />}
						</div>
						<div className={classes.playerDiv}>
							<Player
								spotifyApi={spotifyApi}
								currentTimePosition={currentTimePosition}
							/>
						</div>
					</div>
				</Grid>
				<Grid item xs={3} className={classes.roomRight}>
					<div className={classes.chatContainer}></div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Room;
