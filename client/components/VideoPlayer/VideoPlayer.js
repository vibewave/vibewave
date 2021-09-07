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
	const [playing, setPlaying] = useState(false);
	const [player, setPlayer] = useState(null);
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
		dispatch(fetchRoom(roomId));
		dispatch(fetchVideos(roomId));
	}, []);

	//when the queue is loaded set the first video on the player
	useEffect(() => {
		if (videoQueue.length > 0) {
			setCurrentVideo(videoQueue[0]);
		} else {
			setCurrentVideo('');
		}
	}, [videoQueue]);

	//set the host when roomId is available
	useEffect(() => {
		if (playing) {
			handleOnPlay();
		}
	}, [playing]);

	//handlers for the player
	const handleOnPlay = () => {
		if (room.hostId === user.id) {
			sendCurrentTime(roomId);
		} else {
			dispatch(fetchVideos(roomId));
			socket.emit('request-currentTime', roomId, user.id);
			getCurrentTimeFromHost();
			setPlaying(true);
		}
	};

	const handleEnded = () => {
		if (room.hostId === user.id) {
			dispatch(removeVideo(currentVideo.id, roomId));
		} else {
			dispatch(fetchVideos(roomId));
		}

		if (videoQueue.length === 1) {
			setPlaying(false);
		} else {
			setPlaying(false);
			setPlaying(true);
		}
	};

	const ref = player => {
		setPlayer(player);
	};

	const sendCurrentTime = roomId => {
		socket.on('get-currentTime-from-host', userId => {
			const currentTime = player.getCurrentTime();
			const hostVideoId = currentVideo.id;
			socket.emit('send-currentTime', roomId, userId, currentTime, hostVideoId);
		});
	};

	const getCurrentTimeFromHost = () => {
		socket.on('currentTime', (userId, currentTime, hostVideoId) => {
			if (user.id === userId) {
				if (currentVideo.id === hostVideoId) {
					player.seekTo(currentTime);
				} else {
					setTimeout(() => player.seekTo(currentTime), 500);
				}
			}
		});
	};

	return (
		<div>
			{
				//room conditional is required to set the host
				room.id && (
					<ReactPlayer
						ref={ref}
						width="100%"
						controls={room.hostId === user.id}
						playing={playing}
						onEnded={handleEnded}
						onPlay={() => setPlaying(true)}
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
