import React from 'react';
import { connect, TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../../store';

const AllRooms = (props: { rooms: any }) => {
	// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
	// const rooms = useAppSelector(state => {
	// 	console.log('state is ', state);
	// 	return state.rooms;
	// });

	return (
		<div>
			{props.rooms.map((room: any) => (
				<div key={room}>{room}</div>
			))}
		</div>
	);
};

// export default AllRooms;

const mapState = (state: any) => {
	return {
		rooms: state.rooms,
	};
};

export default connect(mapState)(AllRooms);
