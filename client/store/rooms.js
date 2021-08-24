

// Action Types
const CREATE_ROOMS = 'CREATE_ROOMS';

// Action Creators
const _createRooms = (room) => {
  return {
    type: CREATE_ROOMS,
    room
  };
};

// Thunks
export const createRooms = (room) => {
  return async (dispatch) => {
    const action = _createRooms(room);
    dispatch(action);
  }
};


export default function (state=[], action) {
  switch(action.type) {
    case CREATE_ROOMS:
      return [ ...state, action.room ];
    default:
      return state;
  }
}
