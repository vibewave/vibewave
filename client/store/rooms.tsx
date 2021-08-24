

// Action Types
const CREATE_ROOMS = 'CREATE_ROOMS';

// Action Creators
const _createRooms = (room: any) => {
  return {
    type: CREATE_ROOMS,
    room
  };
};

// Thunks
export const createRooms = (room: any) => {
  return async (dispatch: any) => {
    const action = _createRooms(room);
    dispatch(action);
  }
};


export default function (state=[], action: any) {
  switch(action.type) {
    case CREATE_ROOMS:
      return [ ...state, action.room ];
    default:
      return state;
  }
}