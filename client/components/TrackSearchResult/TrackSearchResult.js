import React from 'react';

const TrackSearchResult = ({ chooseTrack, track }) => {
  const handlePlay = () => {
    chooseTrack(track);
  }
  return (
    <div 
      className='searchResultContainer'
      onClick={handlePlay}
    >
      <img src={track.albumUrl} />
      <div>
        <div>
          {track.title}
        </div>
        <div>
          {track.artist}
        </div>
      </div>
    </div>
  )
}

export default TrackSearchResult;