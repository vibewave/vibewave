import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import TrackSearchResult from '../TrackSearchResult/TrackSearchResult';

const SongSearch = ({ spotifyApi }) => {
  const [searchSongName, setSearchSongName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState('');
  const { accessToken } = useSelector(state => state.spotifyAuth)

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearchSongName('');
  }

  useEffect(async () => {
    if(!searchSongName) return setSearchResults([]);
    if(!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(searchSongName).then((res) => {
      if(cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if(image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artist[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    });

    return () => (cancel = true);
  }, [searchSongName, accessToken]);

  return (
    <div>
      <form>
        <TextField 
          id='outlined-basic'
          label='SongSearch'
          variant='outlined'
          value={searchSongName}
          onChange={(e) => setSearchSongName(e.target.value)}>
        </TextField>
      </form>
      <div className='songlist' style={{ overflow: 'auto' }}>
        {searchResults.map((track) => (
          <TrackSearchResult 
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
    </div>
  )
}

export default SongSearch;