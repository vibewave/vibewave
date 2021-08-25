import React from 'react';
import Routes from './Routes';
import Navbar from './components/Navbar/Navbar';

const authCode =
	new URLSearchParams(window.location.search).get('code') ?? '';
if (authCode) {
	window.localStorage.setItem('spotifyAuthCode', authCode);
}
console.log(authCode);

const App = () => {
	return (
		<>
			<Navbar />
			<Routes />
		</>
	);
};

export default App;
