import axios from 'axios';
import store from '../store';
import { fetchRooms } from '../store';

// Action Types
const FETCH_USERS = 'FETCH_USERS';

// Action Creators
const _fetchUsers = (users) => {
  return {
    type: FETCH_USERS,
    users
  }
}

// Thunks 
export const fetchUsers = (roomId) => {
  return async dispatch => {
    const { data: usersAndRoom } = await axios.get(`/api/rooms/${roomId}`);
    const action = _fetchUsers(usersAndRoom);
    dispatch(action);
  }
}

export const handleEnterRoom = (roomId, userId, history) => {
  return async dispatch => {
    await axios.put(`/api/users/${userId}`, { roomId });
    history.push(`/rooms/${roomId}`);
    dispatch(fetchUsers(roomId));
  }
}

export const leaveRoom = (roomId, userId) => {
  return async dispatch => {
    await axios.put(`/api/users/${userId}`, { roomId: null });
    dispatch(fetchUsers(roomId));
  }
}

export const hostLeaveAndDeleteRoom = (roomId, userId, allRooms, history) => {
  // console.log('inside hostLeaveRoom');
  return async dispatch => {
    for(let i = 0; i < allRooms.length; i++) {
      // console.log(`allRooms[${i}].id: `, allRooms[i].id);
      // console.log('roomId: ', roomId);
      // console.log(`allRooms[${i}].hostId`, allRooms[i].hostId);
      // console.log('userId: ', userId);
      if(allRooms[i].id == roomId && allRooms[i].hostId == userId) {
        // console.log('inside delete');
        await axios.delete(`/api/rooms/${roomId}`);
        dispatch(fetchUsers(roomId));
        store.dispatch(fetchRooms());
        history.push('/home');
      }
    }
  }
}

export default function(state=[], action) {
  switch(action.type) {
    case FETCH_USERS:
      return action.users;
    default:
      return state;
  }
}