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

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scopeParam}`;

export default AUTH_URL;
