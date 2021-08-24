import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid } from '@material-ui/core';
import useStyles from './NavbarStyle';

const Navbar = () => {
	const classes = useStyles();
	return (
		<div id="navbar-container" className={classes.navBarContainer}>
			<Grid container>
				<Typography variant="h4" className={classes.logoContainer}>
					Vibewave
					<Link to="/createroom">
						<Button variant="contained" className={classes.createRoomButton}>
							Create Room
						</Button>
					</Link>
				</Typography>
			</Grid>
		</div>
	);
};

export default Navbar;
