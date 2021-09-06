import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { socket } from '../../socket/socket';

const RoomClosingPopup = () => {
	const [open, setOpen] = useState(false);
	const [countdown, setCountdown] = useState(5);

	useEffect(() => {
		hostClosedRoom();
	}, []);

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				let count = countdown;
				if (countdown > 0) {
					setCountdown(count - 1);
				}
			}, 1000);
		}
	}, [countdown, open]);

	const hostClosedRoom = () => {
		socket.on('room-closing', () => {
			setOpen(true);
		});
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<div>
			<Dialog
				open={open}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'The host has closed the room'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Returning to the main room in {countdown}
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default RoomClosingPopup;
