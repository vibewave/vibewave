import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../store';
import { useParams } from 'react-router';
import useStyles from './MessageListStyle';

const MessageList = props => {
	const dispatch = useDispatch();
	const roomId = parseInt(useParams().id, 10);
	const messages = useSelector(state => state.messages);
	const classes = useStyles();

	useEffect(() => {
		if (roomId) {
			dispatch(fetchMessages(roomId));
		}
	}, [roomId]);

	return (
		<div className={classes.container}>
			{messages &&
				messages.map(message => {
					return (
						<div key={message.id} className={classes.bubble}>
							{message.user.username}: {message.message}
						</div>
					);
				})}
			<div className={classes.last}>End of Messages</div>
		</div>
	);
};

export default MessageList;
