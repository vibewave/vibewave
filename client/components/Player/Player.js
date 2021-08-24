import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyWebApi from 'spotify-web-api-node';
import useSpotifyAuth from '../../customHooks/useSpotifyAuth';

const spotifyApi = new SpotifyWebApi({
	clientId: 'a28a1d73e5f8400485afaff5e584ca32',
});

const authCode =
	new URLSearchParams(window.location.search).get('code') ?? '';

export default function Player() {
	const accessToken = useSpotifyAuth(authCode) ?? '';
	const trackUri = '2gMXnyrvIjhVBUZwvLZDMP';

	const [play, setPlay] = useState(false);

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(() => {
		setPlay(true);
	}, [trackUri]);

	return (
		<SpotifyPlayer
			token={accessToken}
			showSaveIcon
			callback={state => {
				if (!state.isPlaying) setPlay(false);
			}}
			play={play}
			uris={trackUri ? [trackUri] : []}
		/>
	);
}
