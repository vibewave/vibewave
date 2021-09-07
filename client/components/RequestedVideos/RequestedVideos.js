import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRoom, fetchUsers, fetchRequestedVideos, addRequestedVideoToQueue } from '../../store';
import useStyles from './RequestedVideosStyle';
import he from 'he';
import { socket } from '../../socket/socket';

const RequestedVideos = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth);
	const room = useSelector(state => state.room);
	const roomId = parseInt(useParams().id, 10);
	let requestedVideos = useSelector(state => state.requestedVideos);

	useEffect(() => {
		dispatch(fetchRoom(roomId));
		dispatch(fetchRequestedVideos(roomId));
	}, []);

	const hostAddRequestedVideo = (video, roomId) => {
		if(room?.hostId === user?.id) {
			dispatch(addRequestedVideoToQueue(video, roomId));
		}
	}

	if (!requestedVideos) return <></>;
	return (
		<>
			<h4 className={classes.requestBoardHeader}>Request Board</h4>
			<div className={classes.requestedVideosContainer}>
				{requestedVideos.map(video => (
					<div 
						key={video.id} 
						className={classes.requestedVideoItemsContainer}
						onClick={() => hostAddRequestedVideo(video, roomId)}
					>
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
