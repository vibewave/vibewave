import React from 'react';
import MessageEntry from '../MessageEntry/MessageEntry';
import MessageList from '../MessageList/MessageList';

const Chat = props => {
	return (
		<div>
			<MessageList />
			<MessageEntry />
		</div>
	);
};

export default Chat;
