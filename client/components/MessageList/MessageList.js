import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, fetchRoom, fetchUsers, parseDate } from '../../store';
import { useParams } from 'react-router';
import useStyles from './MessageListStyle';

const MessageList = props => {
	const dispatch = useDispatch();
	const roomId = parseInt(useParams().id, 10);
	const room = useSelector(state => state.room);
	const user = useSelector(state => state.auth);
	const messages = useSelector(state => state.messages);
	const classes = useStyles();
	const [count, setCount] = useState(0);

	useEffect(() => {
		dispatch(fetchRoom(roomId));
		dispatch(fetchUsers(roomId));
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setCount(count+1);
		}, 60000);
	}, [count])

	useEffect(() => {
		if (room.id) {
			dispatch(fetchMessages(room.id));
		}
	}, [room]);

	if (!room || !user) return <></>;
	return (
		<div className={classes.messageListContainer}>
			<div className={classes.messageList}>
				{messages &&
					messages.map(message => {
						const isMine = message.user.id === user.id;
						const messageClassName = isMine
							? classes.bubbleMine
							: classes.bubble;
						const messageSentDateClassName = isMine
							?	classes.messageSentDateMine
							: classes.messageSentDate;
						return (
							<div key={message.id} className={messageClassName}>
								{message.user.username}: {message.message}
								<div className={messageSentDateClassName}>
									{`Sent ${parseDate(message.createdAt)}`}
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default MessageList;
