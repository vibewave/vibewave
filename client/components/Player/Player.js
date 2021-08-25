import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyWebApi from 'spotify-web-api-node';
import { useDispatch, useSelector } from 'react-redux';
import { spotifyAuthenticate } from '../../store/spotifyAuth';

const spotifyApi = new SpotifyWebApi({
	clientId: 'a28a1d73e5f8400485afaff5e584ca32',
});

export default function Player() {
	const authCode = window.localStorage.getItem('spotifyAuthCode');

	const spotifyAuth = useSelector(state => state.spotifyAuth);
	const accessToken = spotifyAuth?.accessToken;
	const dispatch = useDispatch();
	const trackUri = 'spotify:track:2gMXnyrvIjhVBUZwvLZDMP';

	const [play, setPlay] = useState(false);

	useEffect(() => {
		dispatch(spotifyAuthenticate(authCode));
	}, []);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	return (
		<>
		{accessToken &&
		<SpotifyPlayer
			token={accessToken}
			showSaveIcon
			callback={state => {
				if (!state.isPlaying) setPlay(false);
			}}
			play={play}
			uris={trackUri ? [trackUri] : []}
		/>}
		</>
	);
}
