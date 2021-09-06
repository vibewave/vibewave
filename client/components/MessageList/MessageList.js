import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, fetchRoom } from '../../store';
import { useParams } from 'react-router';
import useStyles from './MessageListStyle';

const MessageList = props => {
	const dispatch = useDispatch();
	const roomId = parseInt(useParams().id, 10);
	const room = useSelector(state => state.room);
	const messages = useSelector(state => state.messages);
	const classes = useStyles();
	const user = useSelector(state => state.auth);

	useEffect(() => {
		dispatch(fetchRoom(roomId));
	}, []);

	useEffect(() => {
		if (room.id) {
			dispatch(fetchMessages(room.id));
		}
	}, [room]);

	return (
		<div className={classes.messageListContainer}>
			<div className={classes.messageList}>
				{messages &&
					messages.map(message => {
						return (
							<div key={message.id} className={message.userId === user.id ? classes.bubbleMe : classes.bubbleThem}>
								{message.user.username}: {message.message}
							</div>
						);
					})}
				{/* <div className={classes.last}>End of Messages</div> */}
			</div>
		</div>
	);
};

export default MessageList;
