import axios from 'axios';

// Action Types
const SET_THUMBNAILS = 'SET_THUMBNAILS';

// Action Creators
export const setThumbnails = (thumbnails) => {
  return {
    type: SET_THUMBNAILS,
    thumbnails
  }
}

// Thunks
export const fetchThumbnails = () => {
  return async dispatch => {
    let thumbnailMemo = {};
    const { data: rooms } = await axios.get('/api/rooms');
    for (let i = 0; i < rooms.length; i++) {
      const { data: { 0: video } } = await axios.get(`/api/videos/${rooms[i].id}`)
      if(video) {
        thumbnailMemo[rooms[i].id] = video.thumbnailUrl;
      }
    }
    dispatch(setThumbnails(thumbnailMemo));
  }
}

export default function(state={}, action) {
  switch(action.type) {
    case SET_THUMBNAILS:
      return action.thumbnails;
    default:
      return state;
  }
}



