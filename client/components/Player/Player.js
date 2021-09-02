import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../socket/socket';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';
import { fetchUsers, removeTrack, fetchTracks } from '../../store';
import RoomPopupDialog from '../RoomPopupDialog/RoomPopupDialog';

//try including this into the non host seek useeffect
const getTimeAndSeek = () => {};

const Player = props => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { id } = useParams();

	const {
		spotifyApi,
		currentTimePosition,
		// currentTrack,
		// trackEnded,
		// setTrackEnded,
	} = props;

	// console.log('currentTrack: ', currentTrack);

	const user = useSelector(state => state.auth);
	const roomAndUsers = useSelector(state => state.userRoom);
	const spotifyAuth = useSelector(state => state.spotifyAuth);
	const accessToken = spotifyAuth?.accessToken;

	const [isDialogOpen, setIsDialogOpen] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isReady, setIsReady] = useState('INITIALIZING');
	const [playerError, setPlayerError] = useState('');
	const [isHost, setIsHost] = useState(false);
	const [currentTrack, setCurrentTrack] = useState({});
	const tracks = useSelector(state => state.trackQueue);
	const [trackEnded, setTrackEnded] = useState(false);
	const [progressMs, setProgressMs] = useState(0);
	const [seeked, setSeeked] = useState(false);
	const [playerType, setplayerType] = useState('player_update');
	const [trackUpdate, setTrackUpdate] = useState(false);

	useEffect(() => {
		setIsDialogOpen(true);
	}, []);

	useEffect(() => {
		dispatch(fetchUsers(id));
		return () => {};
	}, []);

	//check if host and set host
	//consider refactoring and checking if redundant with Room
	useEffect(() => {
		if (roomAndUsers.id) {
			if (roomAndUsers?.id && user?.id === roomAndUsers?.hostId) {
				setIsHost(true);
			}
		}
		return () => {};
	}, [roomAndUsers.id, user]);

	useEffect(() => {
		//set the current track if tracks exist and are greater than 0
		if (tracks.length > 0) {
			setCurrentTrack(tracks[0]);
		}
		//if tracks are empty set the current track to empty and the player is ready. Is ready ensures that we do not set a null track when the initializing (causes player crash)
		else if (tracks.length === 0 && isReady === 'READY') {
			setCurrentTrack(null);
		}
	}, [tracks]);

	//start playing automatically if a song ends
	useEffect(() => {
		//when the track ends remove it from the db and queue
		if (trackEnded && currentTrack.id) {
			dispatch(removeTrack(currentTrack.id, id));
		}
		//automatically start playing the next song if the last track ended, and there are tracks
		if (trackEnded && tracks.length > 1) {
			//set timeout is required to make sure we don't start the previous song again
			setTimeout(() => setIsPlaying(true), 50);
		}

		setTrackEnded(false);

		return () => {};
	}, [trackEnded]);

	//whenever is playing is set to true by the host start the counter for the room
	useEffect(() => {
		// console.log('is playing use effect triggered');
		// console.log('is host ', isHost);
		// console.log('is playing ', isPlaying);

		// if the host presses play reset the counter
		if (isHost && isPlaying) {
			console.log('in if statement for is playing');
			socket.emit('reset-counter', roomAndUsers.id, progressMs, currentTrack.duration);
		}

		// if not the host grab the time from the host
		if (!isHost && isPlaying && !trackUpdate) {
			dispatch(fetchTracks(id));
			socket.emit('seek', room.id, socket.id);
			socket.on('time-position-test', (counter, socketId) => {
				console.log(counter);
				if (socketId === socket.id) {
					console.log('inside seek client side');
					setTimeout(() => {
						spotifyApi.seek(counter);
					}, 400);
				}
			});
		}
	}, [isPlaying]);

	//check if accesstoken is available
	useEffect(() => {
		if (!accessToken) {
			return () => {
				history.push('/spotify-login');
			};
		}
		spotifyApi.setAccessToken(accessToken);
		return () => {};
	}, [accessToken]);

	// Seek player to particular time. Only run after the player is completely ready.
	const browserAutoplayError =
		'Browser prevented autoplay due to lack of interaction';
	const isPlayerReadyToSeek =
		isPlaying &&
		(isReady === 'READY' ||
			(isReady === 'ERROR' && playerError !== browserAutoplayError)) &&
		accessToken &&
		roomAndUsers?.id &&
		!isHost &&
		currentTimePosition > 0;
	useEffect(() => {
		console.log('isReady: ', isReady);
		console.log(
			'Error is browser autoplay error: ',
			playerError === browserAutoplayError
		);

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

	const redirectLogin = () => {
		window.alert(
			`Spotify Authentication Failed. Your Spotify login credentials may have expired. Please login with Spotify again.`
		);
		history.push('/spotify-login');
	};

	const closeRoomPopupDialog = () => {
		setIsDialogOpen(false);
		setIsPlaying(true);
	};

	if (!accessToken || !currentTrack) return <></>;
	return (
		<>
			<RoomPopupDialog
				isDialogOpen={isDialogOpen}
				closeRoomPopupDialog={closeRoomPopupDialog}
				room={roomAndUsers}
				user={user}
			/>
			<SpotifyPlayer
				token={accessToken}
				showSaveIcon
				callback={state => {
					if (state.error) setPlayerError(state.error);
					if (state.status) setIsReady(state.status);
					if (!state.isPlaying) setIsPlaying(false);
					if (state.isPlaying) setIsPlaying(true);
					if (state.progressMs) setProgressMs(state.progressMs);
					if (state.type) {
						// if (state.type !== 'player_update') {
						setplayerType(state.type);
						if (state.type === 'track_update') setTrackUpdate(true);
						// }
					}
					if (
						state.progressMs === 0 &&
						!state.isPlaying &&
						state.status === 'READY' &&
						state.type === 'player_update'
					) {
						setTrackEnded(true);
					}
				}}
				play={isPlaying}
				uris={currentTrack ? currentTrack.trackUri : null}
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
		</>
	);
};

export default Player;
