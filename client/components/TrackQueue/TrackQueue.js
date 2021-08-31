import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTracks } from '../../store/trackQueue';
import useStyles from './TrackQueueStyle';

const TrackQueue = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { id } = useParams();
	let tracks = useSelector(state => state.trackQueue);

	useEffect(() => {
		dispatch(fetchTracks(id));
	}, []);

	if (!tracks) return <></>;
	return (
		<div className={classes.trackQueueContainer}>
			<h4>Track Queue</h4>
			{tracks.map(track => (
				<div key={track.id} className={classes.trackQueueItemsContainer}>
					<div>
						<img src={track.albumUrl} />
					</div>
					<div className={classes.trackQueueDescription}>
						{track.title}
						<br />
						{track.artist}
					</div>
				</div>
			))}
		</div>
	);
};

export default TrackQueue;
