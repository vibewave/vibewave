import React from 'react';
import MessageEntry from '../MessageEntry/MessageEntry';
import MessageList from '../MessageList/MessageList';
import useStyles from './ChatStyle';

const Chat = props => {
	const classes = useStyles();

	return (
		<>
			<MessageList/>

			<MessageEntry/>
		</>
	);
};

export default Chat;
