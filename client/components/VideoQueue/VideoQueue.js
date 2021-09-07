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
		<>
			<h4 className={classes.videoQueueHeader}>Video Queue</h4>
			<div className={classes.videoQueueContainer}>
				<div className={classes.videoQueue}>
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
			</div>
		</>
	);
};

export default VideoQueue;
