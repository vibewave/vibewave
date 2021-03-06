import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuIcon from '@material-ui/icons/Menu';
import { StyledMenu, StyledMenuItem } from './NavbarMenuStyle';
import { logout } from '../../store';
import { hostLeaveAndDeleteRoom } from '../../store';
import { socket } from '../../socket/socket';

const NavbarMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const user = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const room = useSelector(state => state.room);

	useEffect(async () => {
		setIsLoggedIn(!!user.id);
	}, [user]);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleCreateRoom = () => {
		handleClose();
		history.push('/createroom');
	};

	const handleCloseRoom = () => {
		handleClose();
		dispatch(hostLeaveAndDeleteRoom(room.id, history));
		socket.emit('host-closed-room', room.id);
	};

	const handleLogout = async () => {
		await dispatch(logout());
		handleClose();
		history.push('/login');
	};

	return (
		<div>
			<ButtonBase
				aria-controls="customized-menu"
				aria-haspopup="true"
				variant="contained"
				color="primary"
				onClick={handleClick}
			>
				<MenuIcon style={{ color: '#fff' }} fontSize="large" />
			</ButtonBase>
			{isLoggedIn ? (
				<StyledMenu
					id="customized-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<StyledMenuItem>
						<ListItemText onClick={handleCreateRoom} primary="Create Room" />
					</StyledMenuItem>
					{room.hostId === user.id && (
						<StyledMenuItem>
							<ListItemText onClick={handleCloseRoom} primary="Close Room" />
						</StyledMenuItem>
					)}
					<StyledMenuItem>
						<ListItemText onClick={handleLogout} primary="Logout" />
					</StyledMenuItem>
				</StyledMenu>
			) : (
				<StyledMenu
					id="customized-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<StyledMenuItem>
						<a href="https://github.com/vibewave/vibewave" target="_blank">
							<ListItemText primary={'About Vibewave'} />
						</a>
					</StyledMenuItem>
				</StyledMenu>
			)}
		</div>
	);
};

export default NavbarMenu;
