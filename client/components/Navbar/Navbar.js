import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
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
			<div className={classes.logoContainer}>
				<Link to="/">
					<img src="/vibewave-logo-full.png" alt="vibewave logo" className={classes.logo}/>
				</Link>
			</div>
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
