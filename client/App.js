import React from 'react';
import { useHistory } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './components/Navbar/Navbar';

const spotifyAuthCode = new URLSearchParams(window.location.search).get('code');
if (spotifyAuthCode) {
	window.localStorage.setItem('spotifyAuthCode', spotifyAuthCode);
}

const spotifyAuthError = new URLSearchParams(window.location.search).get('error');
if (spotifyAuthError) {
	window.alert(`Spotify Authentication Failed. Your Spotify login credentials may have expired. Please login with Spotify again`);
	const history = useHistory();
	history.push('/spotify-login');
}

const App = () => {
	return (
		<>
			<Navbar />
			<Routes />
		</>
	);
};

export default App;
