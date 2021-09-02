import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = props => {
	return (
		<div>
			<ReactPlayer
				width="100%"
				height="29vw"
				// controls
				url="https://www.youtube.com/watch?v=kTJczUoc26U&ab_channel=TheKidLAROIVEVO"
			/>
		</div>
	);
};

export default VideoPlayer;
