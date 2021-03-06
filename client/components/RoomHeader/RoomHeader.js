import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useStyles from './RoomHeaderStyle';
import { fetchUsers, fetchRoom, fetchHost } from '../../store';

const RoomHeader = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const roomId = parseInt(useParams().id, 10);
	const room = useSelector(state => state.room);
	const user = useSelector(state => state.auth);
	const users = useSelector(state => state.users);
	const host = useSelector(state => state.host);

	useEffect(() => {
		dispatch(fetchRoom(roomId));
		dispatch(fetchUsers(roomId));
		dispatch(fetchHost(roomId));
	}, []);

	if (!room || !user || !users || !host) {
		return <div className={classes.roomHeaderContainer}>Loading...</div>;
	}

	return (
		<div className={classes.roomHeaderContainer}>
			<div className={classes.roomImgContainer}>
				<img
					src="/darkMusicIcon.jpg"
					alt="default room image"
					className={classes.roomImg}
				/>
			</div>
			<div className={classes.roomDescriptionContainer}>
				<h3 className={classes.roomTitle}>{room?.title}</h3>
				<h4 className={classes.hostedBy}>
					{room.hostId === user.id && `You are the host of this room`}
					{room.hostId !== user.id && `Hosted by ${host.username}`}
				</h4>
			</div>
			<div className={classes.liveUsersContainer}>
				<h4 className={classes.liveUsersText}>
					<span className={classes.numUsers}>{users.length}</span>
					{users.length === 1
						? ` user is currently enjoying ${room.title}.`
						: ` users are currently enjoying ${room.title}.`}
				</h4>
			</div>
		</div>
	);
};

export default RoomHeader;
