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
	fetchRoom,
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
	const roomId = parseInt(useParams().id, 10);
	const user = useSelector(state => state.auth);
	// use this to display list of users
	const allRooms = useSelector(state => state.allRooms);
	const room = useSelector(state => state.room);
	const [currentTimePosition, setCurrentTimePosition] = useState(0);

	useEffect(() => {
		dispatch(fetchUsers(roomId));
		dispatch(fetchRooms());
		dispatch(fetchRoom(roomId));
		return () => {
			console.log('in leave room');
			dispatch(leaveRoom(roomId, user.id));
		};
	}, []);

	useEffect(() => {
		if (room.id) {
			joinRoom(room.id);
		}
	}, [room]);

	useEffect(() => {
		getTimePosition();
		// return () => {};
	}, []);

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
							{room.hostId === user.id && 'I am the host'}
							{room.hostId !== user.id && 'I am not the host'}
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
