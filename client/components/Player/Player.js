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
	
	const playerDummyDiv = useRef();

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
		setTimeout(() => {
			clickMute();
		}, 3000)
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
				}, 3500);
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

	// useEffect(() => {
	// 	if (isReady === 'READY' && !isPlaying) {
	// 		console.log(isReady);
	// 		console.log(isPlaying);
	// 		clickMute();
	// 	}
	// 	return () => {};
	// }, [isReady, isPlaying]);

	const joinRoom = () => {
		socket.emit('join-room');
	};

	const redirectLogin = () => {
		window.alert(`Spotify Authentication Failed. Your Spotify login credentials may have expired. Please login with Spotify again.`);
		history.push('/spotify-login');
	};
	
	const clickMute = () => {
		if (playerDummyDiv.current) {
			const playerContent = playerDummyDiv.current.firstChild.lastChild;
			const playerVolume = playerContent.lastChild.firstChild;
			const playerVolumeButton = playerVolume.firstChild;
			const playButton = playerContent.firstChild.nextSibling.firstChild.nextSibling.firstChild;

			console.dir(playerContent);
			console.dir(playerVolumeButton);
			console.dir(playButton);

			setTimeout(() => {
				
				console.dir(playButton);
				playerVolumeButton.click();
				
				const playerVolumeDrag = playerVolume.firstChild;
				const volumeRange = playerVolumeDrag.firstChild.lastChild.firstChild;
				
				console.dir(volumeRange.style.height);
				volumeRange.style.height = "0%";
				console.dir(volumeRange.style.height);
				
				playerDummyDiv.current.click();
				playerDummyDiv.current.parentNode.click();
				playButton.click();
				playButton.click();
			}, 0);
			console.log('Play Track clicked!');
			// setIsPlaying(true);
		}
	}


	if (!accessToken || !currentTrack) return <></>;
	return (
		<>
			{/* <button style={{width: '50px', height: '30px'}} onClick={() => setIsPlaying(true)}>
				Play Track
			</button> */}
			<div ref={playerDummyDiv} >				
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
			</div>
		</>
	);
}

export default Player;
