import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../socket/socket';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';
import { getRoom, removeTrack } from '../../store';

const Player = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();

	const {
		spotifyApi,
		currentTimePosition,
		currentTrack,
	} = props;

	// console.log('currentTrack: ', currentTrack);

	const user = useSelector(state => state.user);
	const room = useSelector(state => state.room);
	const spotifyAuth = useSelector(state => state.spotifyAuth);
	const accessToken = spotifyAuth?.accessToken;
	// const trackUri = 'spotify:track:2gMXnyrvIjhVBUZwvLZDMP';

	const [isPlaying, setIsPlaying] = useState(false);
	const [isReady, setIsReady] = useState("INITIALIZING");
	const [playerError, setPlayerError] = useState('');
	const [isHost, setIsHost] = useState(false);


	useEffect(() => {
		dispatch(getRoom(id));
		return () => {};
	}, []);

	// useEffect(() => {
	// 	if(currentTrack.id) {
	// 		dispatch(removeTrack(currentTrack.id, id));
	// 	}
	// }, [isReady]);

	useEffect(() => {
		if (room.id) {
			joinRoom();
			if (room?.id && user?.id === room?.hostId) {
				setIsHost(true);
			}
		}
		return () => {};
	}, [room.id]);

	useEffect(() => {
		setIsPlaying(true);
		return () => {};
	}, []);

	useEffect(() => {
		if (!accessToken) {
			return () => {
				history.push('/spotify-login');
			};
		};
		spotifyApi.setAccessToken(accessToken);
		return () => {};
	}, [accessToken]);

	// Seek player to particular time. Only run after the player is completely ready.
	const browserAutoplayError = "Browser prevented autoplay due to lack of interaction";
	const isPlayerReadyToSeek = isPlaying && (isReady === "READY" || (isReady === "ERROR" && playerError !== browserAutoplayError)) && accessToken && room?.id && !isHost && currentTimePosition > 0;
	useEffect(() => {
		console.log('isReady: ', isReady);
		console.log('Error is browser autoplay error: ', playerError === browserAutoplayError);

		if (isPlayerReadyToSeek) {
			console.log('isReady: ', isReady);
			console.log('seek useeffect running');
			console.log('current Time Position: ', currentTimePosition);
				setTimeout(() => {
					spotifyApi.seek(currentTimePosition);
				}, 100);
		}
		return () => {};
	}, [isPlayerReadyToSeek]);

	/* Handle player errors.
	- If 'Authentication failed' error, redirect user to re-login with Spotify.
	- If other error, console.log(error) */
	useEffect(() => {
		if (playerError) {
			console.log(playerError);
		}
		if (playerError === 'Authentication failed') {
			redirectLogin();
		}
		return () => {};
	}, [playerError]);

	const joinRoom = () => {
		socket.emit('join-room');
	};

	const redirectLogin = () => {
		window.alert(`Spotify Authentication Failed. Your Spotify login credentials may have expired. Please login with Spotify again.`);
		history.push('/spotify-login');
	};


	if (!accessToken || !currentTrack) return <></>;
	return (
		<SpotifyPlayer
			token={accessToken}
			showSaveIcon
			callback={state => {
				if (state.error) setPlayerError(state.error);
				if (state.status) setIsReady(state.status);
				console.log('volume: ', state.volume);
			}}
			play={isPlaying}
			uris={currentTrack.trackUri}
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
