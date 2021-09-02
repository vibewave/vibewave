import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages } from '../../store';
import { useParams } from 'react-router';

const MessageList = props => {
	const dispatch = useDispatch();
	const roomId = parseInt(useParams().id, 10);
	const messages = useSelector(state => state.messages);

	useEffect(() => {
		console.log('inside fetch useEffect ');
		if (roomId) {
			dispatch(fetchMessages(roomId));
		}
	}, [roomId]);

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
