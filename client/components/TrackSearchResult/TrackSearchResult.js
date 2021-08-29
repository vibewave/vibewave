import React from 'react';
import { classicNameResolver } from 'typescript';
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
      <div className={classes.searchResultItems}>
        <div>
          <img src={track.albumUrl} />
        </div>
        <div className={classes.trackDescription}>
          Title: {track.title}
          <br />
          Artist: {track.artist}
        </div>
      </div>
    </div>
  )
}

export default TrackSearchResult;