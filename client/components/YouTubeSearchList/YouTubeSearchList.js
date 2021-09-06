import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useStyles from './YouTubeSearchListStyle';
import {
  fetchUsers,
  fetchRoom,
} from '../../store';

const YouTubeSearchList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const roomId = parseInt(useParams().id, 10);
  const room = useSelector(state => state.room);
  const user = useSelector(state => state.user);

  const {
    video,
    chooseVideo,
    chooseRequestedVideo,
  } = props;

  useEffect(() => {
    dispatch(fetchRoom(roomId));
    dispatch(fetchUsers(roomId));
  }, [roomId]);

  const handlePlay = () => {
    if (room?.hostId === user.id) {
      chooseVideo(video);
    }
    else {
      chooseRequestedVideo(video);
    }
    console.log('video title: ', video.snippet.title);
    console.log('isRequested Video: ', room?.hostId === user.id);
  }

  return (
    <div
      className={classes.searchResultItemsContainer}
      onClick={handlePlay}
    >
      <div className={classes.thumbnailImgContainer}>
        <img src={video.snippet.thumbnails.default.url} className={classes.thumbnailImg} />
      </div>
      <div className={classes.videoDescription}>
        <h4>{video.snippet.title}</h4>
      </div>
    </div>
  )
}

export default YouTubeSearchList;
