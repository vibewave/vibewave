import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRequestedVideos } from '../../store';
import useStyles from './RequestedVideosStyle';

const RequestedVideos = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { id: roomId } = useParams();
	let requestedVideos = useSelector(state => state.requestedVideos);

	useEffect(() => {
		dispatch(fetchRequestedVideos(roomId));
	}, []);

	if (!requestedVideos) return <></>;
	return (
		<>
			<h4>Request Board</h4>
			<div className={classes.requestedVideosContainer}>
				{requestedVideos.map(video => (
					<div key={video.id} className={classes.requestedVideoItemsContainer}>
						<div>
							<img src={video.thumbnailUrl} className={classes.videoThumbnail}/>
						</div>
						<div className={classes.requestedVideoDescription}>
							{video.title}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default RequestedVideos;
