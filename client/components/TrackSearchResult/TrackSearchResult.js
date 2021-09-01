import React from 'react';
import useStyles from './TrackSearchResultStyle';

const TrackSearchResult = ({ chooseTrack, track }) => {
  const classes = useStyles();

  const handlePlay = () => {
    chooseTrack(track);
  }
  return (
    <div
      className={classes.searchResultItemsContainer}
      onClick={handlePlay}
    >
      <div className={classes.albumImgContainer}>
        <img src={track.albumUrl} className={classes.albumImg} />
      </div>
      <div className={classes.trackDescription}>
        <h4>{track.title}</h4>
        <h5>{track.artist}</h5>
      </div>
    </div>
  )
}

export default TrackSearchResult;
