import React, { useState } from 'react';
import { writeMessage, fetchMessages } from '../../store';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { socket } from '../../socket/socket';
import useStyles from './MessageEntryStyle';

const MessageEntry = props => {
	const [message, setMessage] = useState('');
	const user = useSelector(state => state.auth);
	const roomId = parseInt(useParams().id, 10);
	const dispatch = useDispatch();
	const classes = useStyles();

	const handleSumbit = async event => {
		event.preventDefault();
		await dispatch(writeMessage(message, roomId, user.id));
		setMessage('');
		socket.emit('new-message', roomId, user.id);
	};

	return (
		<div className={classes.messageEntryContainer}>
			<form onSubmit={handleSumbit} className={classes.messageEntry}>
				<TextField
					id="outlined-basic"
					label="message entry"
					variant="outlined"
					value={message}
					onChange={e => setMessage(e.target.value)}
					inputProps={{ maxLength: 140 }}
					required
					className={classes.input}
				/>
				<Button type="submit" variant="contained" className={classes.sendButton}>
					<SendIcon className={classes.sendIcon}/>
				</Button>
			</form>
		</div>
	);
};

export default MessageEntry;
