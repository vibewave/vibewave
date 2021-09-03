import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { socket } from '../../socket/socket';
import { fetchVideos, removeVideo, fetchRoom } from '../../store';

const testVideos = [
	'https://www.youtube.com/watch?v=kTJczUoc26U&ab_channel=TheKidLAROIVEVO',
	'https://www.youtube.com/watch?v=XCyIcifbOWE&ab_channel=MeekMill',
	'https://www.youtube.com/watch?v=7Azv0G85lh8&ab_channel=HalseyVEVO',
];

const VideoPlayer = props => {
	//state variables
	const [isHost, setIsHost] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [player, setPlayer] = useState(null);
	const [seeked, setSeeked] = useState(false);
	const [currentVideo, setCurrentVideo] = useState('');

	//params variables
	const roomId = parseInt(useParams().id, 10);

	//variables from store
	const videoQueue = useSelector(state => state.videoQueue);
	const room = useSelector(state => state.room);
	const user = useSelector(state => state.auth);

	//dispatch
	const dispatch = useDispatch();

	//component did mount - grab videos and room
	useEffect(() => {
		dispatch(fetchVideos(roomId));
		dispatch(fetchRoom(roomId));
	}, []);

	//when the queue is loaded set the first video on the player
	useEffect(() => {
		if (videoQueue.length > 0) {
			setCurrentVideo(videoQueue[0]);
		}
	}, [videoQueue]);

	//set the host when roomId is available
	useEffect(() => {
		if (room.id && room.hostId === user.id) {
			setIsHost(true);
		}
	}, [room]);

	useEffect(() => {
		console.log('inside handleOnPlay useEffect');
		if (playing) {
			handleOnPlay();
		}
		else {
			handleOnPause();
		}
	}, [playing]);

	//handlers for the player

	const handleOnReady = () => {
		console.log('on ready');
	};

	const handleOnPause = () => {
		console.log('on pause');

		//this conditional should only apply to non-host
		if (seeked) {
			setPlaying(true);
		}
	};

	const handleOnPlay = () => {
		if (isHost) {
			// const currentTime = player.getCurrentTime();
			sendCurrentTime(roomId);
		}
		else {
			socket.emit('request-currentTime', roomId, user.id);
			getCurrentTimeFromHost();
			// setPlaying(false);
			setPlaying(true);
		}
		console.log('on play');
		// if (!seeked) {
		// 	console.log('in seeked conditional');
		// 	// player.seekTo(30);
		// 	setSeeked(true);

		// 	//if handle pause to complicated with host/non-host then consider using this setTimeout
		// 	// setTimeout(() => setPlaying(true), 100);
		// }
	};

	const sendCurrentTime = (roomId) => {
		socket.on('get-currentTime-from-host', userId => {
			const currentTime = player.getCurrentTime();
			socket.emit('send-currentTime', roomId, userId, currentTime);
		});
	};

	const getCurrentTimeFromHost = () => {
		socket.on('currentTime', (userId, currentTime) => {
			if (user.id === userId) {
				player.seekTo(currentTime);
			}
		});
	}

	const handleEnded = () => {
		console.log('in ended');
		dispatch(removeVideo(currentVideo.id, roomId));
		if (videoQueue.length === 1) {
			setPlaying(false);
		} else {
			setPlaying(false);
			setPlaying(true);
		}
	};

	const handleSeek = e => {
		console.log('in handle seek');
		console.log(e);
	};

	const ref = player => {
		setPlayer(player);
	};

	return (
		<div>
			{
				//room conditional is required to set the host
				room.id && (
					<ReactPlayer
						ref={ref}
						width="100%"
						height="29vw"
						controls={isHost}
						playing={playing}
						onReady={handleOnReady}
						onEnded={handleEnded}
						onPlay={() => setPlaying(true)}
						onSeek={handleSeek}
						onPause={() => setPlaying(false)}
						onError={e => console.log('onError', e)}
						url={currentVideo.videoUrl}
					/>
				)
			}
		</div>
	);
};

export default VideoPlayer;
