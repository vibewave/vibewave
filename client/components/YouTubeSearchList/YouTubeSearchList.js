import React from 'react';
import useStyles from './YouTubeSearchListStyle';

const YouTubeSearchList = ({chooseVideo, video}) => {
  const classes = useStyles();

  const handlePlay = () => {
    chooseVideo(video);
    console.log('video title: ', video.snippet.title);
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
