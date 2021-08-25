import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { fetchRooms } from '../../store';

const AllRooms = () => {
	const rooms = useSelector(state => {
		return state.allRooms;
	});

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRooms());
	}, []);

	return (
		<div>
			{rooms.map(room => (
				<Grid key={room.id}>
					<div>{room.title}</div>
				</Grid>
			))}
		</div>
	);
};

export default AllRooms;
