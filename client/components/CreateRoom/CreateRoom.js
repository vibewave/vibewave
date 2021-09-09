import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createRoom } from '../../store';
import useStyles from './CreateroomStyle';
import Typography from '@material-ui/core/Typography';

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
		history.push(`/rooms/${room.id}`);
	};

	return (
		<div className={classes.createRoom}>
			<form onSubmit={handleSubmit} className={classes.createRoomForm}>
				<br />
				<Typography component="h1" variant="h5" className={classes.name}>
					Create Room
				</Typography>
				<br />
				<TextField
					id="outlined-basic"
					label="Room Title (max length: 35 chars)"
					variant="outlined"
					value={roomTitle}
					onChange={e => setRoomTitle(e.target.value)}
					className={classes.titleInput}
					inputProps={{ maxLength: 35 }}
					required
				/>
				<div>
					<br />
					<TextField
						id="outlined-basic"
						label="Room Description (max length: 75 chars)"
						variant="outlined"
						size="medium"
						value={roomDesc}
						multiline
						onChange={e => setRoomDesc(e.target.value)}
						minRows={5}
						maxRows={10}
						className={classes.descriptionInput}
						inputProps={{ maxLength: 75 }}
						required
					/>
				</div>
				<br />
				<div>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						className={classes.submit}
					>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateRoom;
