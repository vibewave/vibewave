import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from './RoomStyle';
import VideoQueue from '../VideoQueue/VideoQueue';
import YouTubeSearch from '../YouTubeSearch/YouTubeSearch';
import RoomHeader from '../RoomHeader/RoomHeader';
import RoomPopupDialog from '../RoomPopupDialog/RoomPopupDialog';
import RoomClosingPopup from '../RoomClosingPopup/RoomClosingPopup';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Chat from '../Chat/Chat';
import RequestedVideos from '../RequestedVideos/RequestedVideos';
import {
	leaveRoom,
	fetchUsers,
	hostLeaveAndDeleteRoom,
	fetchRooms,
	fetchRoom,
} from '../../store';

const joinSocketRoom = id => {
	id = parseInt(id, 10);
	if (Number.isInteger(id)) {
		socket.emit('join-room', id);
	}
};

const leaveSocketRoom = id => {
	id = parseInt(id, 10);
	if (Number.isInteger(id)) {
		socket.emit('leave-room', id);
	}
};

const Room = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const roomId = parseInt(useParams().id, 10);
	const user = useSelector(state => state.auth);
	// use this to display list of users
	const room = useSelector(state => state.room);
	const [currentTimePosition, setCurrentTimePosition] = useState(0);

	const roomClosing = () => {
		socket.on('room-closing', () => setTimeout(() => history.push('/'), 6000));
	};

	useEffect(() => {
		dispatch(fetchUsers(roomId));
		dispatch(fetchRoom(roomId));
		roomClosing();
		return () => {
			console.log('in leave room');
			dispatch(leaveRoom(roomId, user.id));
			leaveSocketRoom(roomId);
		};
	}, []);

	useEffect(() => {
		if (room.id) {
			joinSocketRoom(room.id);
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
			<RoomClosingPopup />
			<Grid container className={classes.mainGridContainer}>
				<Grid item xs={3} className={classes.roomLeft}>
					<div className={classes.videoQueueContainer}>
						<VideoQueue />
					</div>
					<div className={classes.youTubeSearchContainer}>
						<YouTubeSearch />
					</div>
				</Grid>
				<Grid direction="column" item xs={6} className={classes.roomCenter}>
					<div className={classes.roomCenterContainer}>
						<div className={classes.roomInfoDiv}>
							<RoomHeader />
						</div>
						<div className={classes.playerDiv}>
							<VideoPlayer />
						</div>
						<div className={classes.mainArea}>
							{/* {room.hostId === user.id && <YouTubeSearch />} */}
							<RequestedVideos />
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
