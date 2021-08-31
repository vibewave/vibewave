import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createRoom } from '../../store';
import useStyles from './CreateroomStyle';

const CreateRoom = () => {
	const classes = useStyles();
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
		// Promise.resolve(room).then((roomObject) => {
		// 	history.push(`/rooms/${roomObject.id}`)
		// });
		console.log('this is room: ', room);
		history.push(`/rooms/${room.id}`);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<br />
				<TextField
					id="outlined-basic"
					label="Room Title"
					variant="outlined"
					value={roomTitle}
					onChange={e => setRoomTitle(e.target.value)}
				/>
				<div>
					<TextField
						id="outlined-basic"
						label="Room Description"
						variant="outlined"
						size="medium"
						value={roomDesc}
						onChange={e => setRoomDesc(e.target.value)}
						multiline
						rows={12}
						rowsMax={20}
						className={classes.descriptionInput}
					/>
				</div>
				<div>
					<Button size="small " color="primary">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateRoom;
