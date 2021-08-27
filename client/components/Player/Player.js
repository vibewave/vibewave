import React, { useState, useEffect } from 'react';
import { socket } from '../../socket/socket';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';
import { getRoom } from '../../store';
import { useParams } from 'react-router-dom';

const Player = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();

	const {
		spotifyApi,
		currentTimePosition,
	} = props;


	const user = useSelector(state => state.user);
	const room = useSelector(state => state.room);
	const spotifyAuth = useSelector(state => state.spotifyAuth);
	const accessToken = spotifyAuth?.accessToken;
	const trackUri = 'spotify:track:2gMXnyrvIjhVBUZwvLZDMP';

	const [isPlaying, setIsPlaying] = useState(false);
	const [isReady, setIsReady] = useState("INITIALIZING");
	const [playerError, setPlayerError] = useState('');
	const [isHost, setIsHost] = useState(false);
	// const [dataLoaded, setDataLoaded] = useState(false);

	useEffect(() => {
		dispatch(getRoom(id));
	}, []);

	useEffect(() => {
		if (room.id) {
			joinRoom();
			if (room?.id && user?.id === room?.hostId) {
				setIsHost(true);
			}
		}
	}, [room.id]);

	useEffect(() => {
		setIsPlaying(true);
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

	// useEffect(() => {
	// 	console.log('seek useeffect running');
	// 	if (isPlaying && isActive && accessToken && room?.id && !isHost && currentTimePosition > 0) {
	// 		console.log('current Time Position: ', currentTimePosition);
	// 			setTimeout(() => {
	// 				spotifyApi.seek(currentTimePosition);
	// 			}, 3000);
	// 	}
	// }, [isPlaying, isActive, accessToken, room.id, isHost, currentTimePosition]);

	const browserAutoplayError = "Browser prevented autoplay due to lack of interaction"
	useEffect(() => {
		console.log('isReady: ', isReady);
		console.log('error is browser error: ', playerError === browserAutoplayError);
		if (isPlaying && (isReady === "READY" || (isReady === "ERROR" && playerError !== browserAutoplayError)) && accessToken && room?.id && !isHost && currentTimePosition > 0) {
			console.log('isReady: ', isReady);
			console.log('seek useeffect running');
			console.log('current Time Position: ', currentTimePosition);
				setTimeout(() => {
					spotifyApi.seek(currentTimePosition);
				}, 100);
		}
	}, [isPlaying, isReady, playerError, accessToken, room.id, isHost, currentTimePosition]);


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

	const joinRoom = () => {
		socket.emit('join-room');
	};

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
				// if (!state.isPlaying) setIsPlaying(false);
				if (state.error) setPlayerError(state.error);
				if (state.status) setIsReady(state.status);
				console.log(state);
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
