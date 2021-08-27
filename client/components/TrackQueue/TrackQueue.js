import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTracks } from '../../store/trackQueue';

const TrackQueue = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const tracks = useSelector(state => state.trackQueue);
	useEffect(() => {
		dispatch(fetchTracks(id));
	}, []);

	return (
		<div>

		</div>
	);
};

export default TrackQueue;
