import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const AllRooms = () => {
	const rooms = useSelector(state => {
		return state.rooms;
	});

	return (
		<div>
			{rooms.map((room) => (
				<div key={room}>{room}</div>
			))}
		</div>
	);
};

export default AllRooms;
