import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
// import history from '../../history';
import { createRoom } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CreateRoom = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector(state => state.auth);

	const [roomTitle, setRoomTitle] = useState('');
	const [roomDesc, setRoomDesc] = useState('');

	const handleSubmit = async event => {
		event.preventDefault();
		const room = await dispatch(
			createRoom({ title: roomTitle, description: roomDesc, hostId: user.id })
		);
		history.push(`/rooms/${room.id}`);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<br />
				<TextField
					id="outlined-basic"
					label="RoomTitle"
					variant="outlined"
					value={roomTitle}
					onChange={e => setRoomTitle(e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					label="RoomDesc"
					variant="outlined"
					value={roomDesc}
					onChange={e => setRoomDesc(e.target.value)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
};

export default CreateRoom;
