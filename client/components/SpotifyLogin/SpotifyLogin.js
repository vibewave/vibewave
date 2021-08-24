import React from 'react';
import { Container, Button } from '@material-ui/core';
import useStyles from './SpotifyLoginStyle';

const clientId = 'a28a1d73e5f8400485afaff5e584ca32';
const responseType = 'code';
const redirectUri =
	process.env.NODE_ENV === 'production'
		? 'https://vibewave.herokuapp.com'
		: 'http://localhost:3032';
const scopes = [
	'streaming',
	'user-read-email',
	'user-read-private',
	'user-library-read',
	'user-library-modify',
	'user-read-playback-state',
	'user-modify-playback-state',
];
const scopeParam = scopes.join('%20');

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopeParam}`;

export default function Login() {
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
