import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../store';
import { useParams } from 'react-router';

const MessageList = props => {
	const dispatch = useDispatch();
	const roomId = parseInt(useParams().id, 10);
	const room = useSelector(state => state.room);
	const messages = useSelector(state => state.messages);

	useEffect(() => {
		if (room.id) {
			dispatch(fetchMessages(room.id));
		}
	}, [room]);

	return (
		<div>
			{messages &&
				messages.map(message => {
					return (
						<div key={message.id}>
							{message.user.username}: {message.message}
						</div>
					);
				})}
		</div>
	);
};

export default MessageList;
