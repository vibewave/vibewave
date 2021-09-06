import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchVideos } from '../../store';
import useStyles from './VideoQueueStyle';
import he from 'he';

const VideoQueue = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { id: roomId } = useParams();
	let videos = useSelector(state => state.videoQueue);

	useEffect(() => {
		dispatch(fetchVideos(roomId));
	}, []);

	if (!videos) return <></>;
	return (
		<div className={classes.videoQueueContainer}>
			<h4>Video Queue</h4>
			{videos.map(video => (
				<div key={video.id} className={classes.videoQueueItemsContainer}>
					<div>
						<img src={video.thumbnailUrl} className={classes.videoThumbnail}/>
					</div>
					<div className={classes.videoQueueDescription}>
						{he.decode(video.title)}
					</div>
				</div>
			))}
		</div>
	);
};

export default VideoQueue;
