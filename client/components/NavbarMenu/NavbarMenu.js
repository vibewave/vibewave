import React, { useEffect, useState } from 'react';
import { Button, ListItemText, ButtonBase } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store';
import { useHistory } from 'react-router-dom';
import { StyledMenu, StyledMenuItem } from './NavbarMenuStyle';

const NavbarMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(async () => {
		setIsLoggedIn(!!auth.id);
	}, [auth]);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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
						<ListItemText
							onClick={() => history.push('/createroom')}
							primary="Create Room"
						/>
					</StyledMenuItem>
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
						<ListItemText primary={'About Vibewave'} />
					</StyledMenuItem>
				</StyledMenu>
			)}
		</div>
	);
};

export default NavbarMenu;
