import axios from 'axios';

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

export default function(state=[], action) {
  switch(action.type) {
    case FETCH_USERS:
      return action.users;
    default:
      return state;
  }
}