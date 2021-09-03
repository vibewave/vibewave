import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const testVideos = [
	'https://www.youtube.com/watch?v=kTJczUoc26U&ab_channel=TheKidLAROIVEVO',
	'https://www.youtube.com/watch?v=XCyIcifbOWE&ab_channel=MeekMill',
	'https://www.youtube.com/watch?v=7Azv0G85lh8&ab_channel=HalseyVEVO',
];

const VideoPlayer = props => {
	const [playing, setPlaying] = useState(false);
	const [player, setPlayer] = useState(null);
	const [seeked, setSeeked] = useState(false);

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
		console.log('on play');
		if (!seeked) {
			console.log('in seeked conditional');
			player.seekTo(30);
			setSeeked(true);

			//if handle pause to complicated with host/non-host then consider using this setTimeout
			// setTimeout(() => setPlaying(true), 100);
		}
	};

	const handleEnded = () => {
		console.log('in ended');
		testVideos.shift();
		setPlaying(false);
		setPlaying(true);
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
			<ReactPlayer
				ref={ref}
				width="100%"
				height="29vw"
				controls
				playing={playing}
				onReady={handleOnReady}
				onEnded={handleEnded}
				onPlay={handleOnPlay}
				onSeek={handleSeek}
				onPause={handleOnPause}
				url={testVideos[0]}
			/>
		</div>
	);
};

export default VideoPlayer;
