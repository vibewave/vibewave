import React, { useEffect, useState } from 'react';
import {
	Button,
	Menu,
	MenuItem,
	ListItemText,
	withStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store';
import { useHistory } from 'react-router-dom';

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles(theme => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

const NavbarMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(async () => {
		setIsLoggedIn(!!auth.id);
		console.log(isLoggedIn);
	}, [auth]);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		await dispatch(logout());
		history.push('/login');
	};

	return (
		<div>
			<Button
				aria-controls="customized-menu"
				aria-haspopup="true"
				variant="contained"
				color="primary"
				onClick={handleClick}
			>
				Open Menu
			</Button>
			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem>
					<ListItemText
						primary={isLoggedIn ? `Welcome ${auth.username}` : 'Login'}
					/>
				</StyledMenuItem>
				<StyledMenuItem>
					<ListItemText onClick={handleLogout} primary="Logout" />
				</StyledMenuItem>
			</StyledMenu>
		</div>
	);
};

export default NavbarMenu;
