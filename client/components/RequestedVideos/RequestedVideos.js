import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRequestedVideos } from '../../store';
import useStyles from './RequestedVideosStyle';
import he from 'he';

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
			<h4 className={classes.requestBoardHeader}>Request Board</h4>
			<div className={classes.requestedVideosContainer}>
				{requestedVideos.map(video => (
					<div key={video.id} className={classes.requestedVideoItemsContainer}>
						<div>
							<img
								src={video.thumbnailUrl}
								className={classes.videoThumbnail}
							/>
						</div>
						<div className={classes.requestedVideoDescription}>
							{he.decode(video.title)}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default RequestedVideos;
