import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
// import history from '../../history';
import { createRooms } from '../../store/rooms';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CreateRoom = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [roomName, setRoomName] = useState('');

	const handleSubmit = event => {
		event.preventDefault();
		console.log('roomName: ', roomName);
		history.push('/');
		dispatch(createRooms(roomName));
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<br />
				<TextField
					id="outlined-basic"
					label="RoomName"
					variant="outlined"
					value={roomName}
					onChange={e => setRoomName(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default CreateRoom;
