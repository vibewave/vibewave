import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid } from '@material-ui/core';
import useStyles from './NavbarStyle';
import NavbarMenu from '../NavbarMenu/NavbarMenu';

const Navbar = () => {
	const classes = useStyles();
	const auth = useSelector(state => state.auth);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(async () => {
		setIsLoggedIn(!!auth.id);
	}, [auth]);

	return (
		<div id="navbar-container" className={classes.navBarContainer}>
			<Typography variant="h4" className={classes.logoContainer}>
				Vibewave
			</Typography>
			<div className={classes.menuButtonAndUsername}>
				{
				isLoggedIn &&
				<Typography variant="h5" className={classes.userContainer}>
					{auth.username}
				</Typography>
				}
				<div className={classes.menuButton}>
					<NavbarMenu />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
