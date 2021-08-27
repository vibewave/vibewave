import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid } from '@material-ui/core';
import useStyles from './NavbarStyle';
import NavbarMenu from '../NavbarMenu/NavbarMenu';

const Navbar = () => {
	const classes = useStyles();
	return (
		<div id="navbar-container" className={classes.navBarContainer}>
			<NavbarMenu />
			<Typography variant="h4" className={classes.logoContainer}>
				Vibewave
			</Typography>
			<Typography variant="h4" className={classes.createRoomContainer}>
				<Link to="/createroom">
					<Button variant="contained" className={classes.createRoomButton}>
						Create Room
					</Button>
				</Link>
			</Typography>
		</div>
	);
};

export default Navbar;
