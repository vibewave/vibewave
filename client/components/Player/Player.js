import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';


const Player = (props) => {
	const history = useHistory();
	const {
		spotifyApi,
		currentTimePosition,
		timeOfTimePositionFetch
	} = props;
	const currentTimePositionLatency = Date.now() - timeOfTimePositionFetch;
	console.log('Latency in ms: ', currentTimePositionLatency);

	const spotifyAuth = useSelector(state => state.spotifyAuth);
	const accessToken = spotifyAuth?.accessToken;
	const trackUri = 'spotify:track:2gMXnyrvIjhVBUZwvLZDMP';

	const [isPlaying, setIsPlaying] = useState(false);
	const [playerError, setPlayerError] = useState('');

	useEffect(() => {
		if (!accessToken) {
			return () => {
				history.push('/spotify-login');
			};
		};
		spotifyApi.setAccessToken(accessToken);
		return () => {};
	}, [accessToken]);

	// Handle player errors.
	// If 'Authentication failed' error, redirect user to re-login with Spotify.
	// If other error, console.log(error).
	useEffect(() => {
		if (playerError) {
			console.log(playerError);
		}
		if (playerError === 'Authentication failed') {
			redirectLogin();
		}
		return () => {};
	}, [playerError]);


	const redirectLogin = () => {
		window.alert(`Spotify Authentication Failed. Your Spotify login credentials may have expired. Please login with Spotify again.`);
		history.push('/spotify-login');
	}

	if (!accessToken) return <></>;
	return (
		<SpotifyPlayer
			token={accessToken}
			showSaveIcon
			callback={state => {
				if (!state.isPlaying) setIsPlaying(false);
				if (state.error) setPlayerError(state.error);
			}}
			play={isPlaying}
			// autoPlay={true}
			uris={trackUri ? [trackUri] : []}
			styles={{
				activeColor: '#1DB954',
				bgColor: '#27343A',
				color: '#fff',
				loaderColor: '#fff',
				sliderColor: '#1DB954',
				trackArtistColor: '#ccc',
				trackNameColor: '#fff',
			}}
		/>
	);
}

export default Player;
