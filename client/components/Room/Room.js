import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from './RoomStyle';
import VideoQueue from '../VideoQueue/VideoQueue';
import YouTubeSearch from '../YouTubeSearch/YouTubeSearch';
import RoomPopupDialog from '../RoomPopupDialog/RoomPopupDialog';
import {
	leaveRoom,
	fetchUsers,
	hostLeaveAndDeleteRoom,
	fetchRooms,
} from '../../store';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Chat from '../Chat/Chat';


const joinRoom = id => {
	id = parseInt(id, 10);
	if (Number.isInteger(id)) {
		socket.emit('join-room', id);
	}
};

const Room = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const user = useSelector(state => state.auth);
	// use this to display list of users
	const allRooms = useSelector(state => state.allRooms);
	const roomAndUsers = useSelector(state => state.userRoom);
	const [isHost, setIsHost] = useState(false);
	const [currentTimePosition, setCurrentTimePosition] = useState(0);

	useEffect(() => {
		dispatch(fetchUsers(id));
		dispatch(fetchRooms());
		return () => {
			dispatch(leaveRoom(id, user.id));
		};
	}, []);

	useEffect(() => {
		if (roomAndUsers.id) {
			joinRoom(roomAndUsers.id);
			if (user.id === roomAndUsers.hostId) {
				setIsHost(true);
			} else {
				console.log('joined the room');
			}
		}
		// return () => {};
	}, [roomAndUsers, user]);

	useEffect(() => {
		getTimePosition();
		// return () => {};
	}, []);

	const startSong = () => {
		console.log('start song button clicked.');
		socket.emit('song-started', true);
	};

	// testing this in player
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
					<div className={classes.videoQueueContainer}>
						<VideoQueue />
					</div>
				</Grid>
				<Grid item xs={7} className={classes.roomCenter}>
					<div className={classes.roomCenterContainer}>
						<div className={classes.roomInfoDiv}>
							{isHost && 'I am the host'}
							{!isHost && 'I am not the host'}
							<button onClick={startSong}>Start Song</button>
							{isHost && (
								<button
									onClick={() =>
										dispatch(
											hostLeaveAndDeleteRoom(id, user.id, allRooms, history)
										)
									}
								>
									Delete Room
								</button>
							)}
							<div>{currentTimePosition}</div>
						</div>
						<div className={classes.playerDiv}>
							<VideoPlayer />
						</div>
						<div className={classes.mainArea}>
							<YouTubeSearch />
						</div>
					</div>
				</Grid>
				<Grid item xs={3} className={classes.roomRight}>
					<div className={classes.chatContainer}>
						<Chat />
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Room;
