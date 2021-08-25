import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyWebApi from 'spotify-web-api-node';
import { useDispatch, useSelector } from 'react-redux';
import { spotifyAuthenthicate } from '../../store/spotifyAuth';

const spotifyApi = new SpotifyWebApi({
	clientId: 'a28a1d73e5f8400485afaff5e584ca32',
});

const authCode = new URLSearchParams(window.location.search).get('code') ?? '';

export default function Player() {
	const spotifyAuth = useSelector(state => state.spotifyAuth);
	const dispatch = useDispatch();
	const accessToken = spotifyAuth?.accessToken;
	const trackUri = '2gMXnyrvIjhVBUZwvLZDMP';

	const [play, setPlay] = useState(false);
	useEffect(() => {
		dispatch(spotifyAuthenthicate(authCode));
	}, [authCode]);
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
