import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import useStyles from './SpotifyLoginStyle';
import AUTH_URL from './spotifyLoginInfo';

const SpotifyLogin = () => {
	const classes = useStyles();

	return (
		<Container
			component="div"
			disableGutters={true}
			maxWidth={false}
			className={classes.spotifyLoginContainer}
		>
			<a href={AUTH_URL}>
				<Button variant="contained" className={classes.spotifyLoginBtn}>
					Login with Spotify
				</Button>
			</a>
		</Container>
	);
}

export default SpotifyLogin;
