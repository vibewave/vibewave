import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
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
					<Link to={`/rooms/${room.id}`}>
						<div>{room.title}</div>
					</Link>
				</Grid>
			))}
		</div>
	);
};

export default AllRooms;
