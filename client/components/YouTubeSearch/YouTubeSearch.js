import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import youtube from '../../store/youtubeAxios';
import { API_KEY } from '../../store/youtubeAxios'
import useStyles from './YouTubeSearchStyle';
import YouTubeSearchList from '../YouTubeSearchList/YouTubeSearchList';
import { addVideo, fetchVideos } from '../../store';

const YouTubeSearch = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [duration, setDuration] = useState(0);
  const [durationPt, setDurationPt] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();

  const convertPtToSec = (pt) => {
    const tIndex = pt.indexOf('T');
    const hIndex = pt.indexOf('H');
    const mIndex = pt.indexOf('M');
    const sIndex = pt.indexOf('S');
    const hoursToSec = hIndex !== -1 ? parseInt(pt.substr(tIndex+1, mIndex), 10) * 60 * 60 : 0;
    const minutesToSec = mIndex !== -1 ? parseInt(pt.substr(tIndex+1, mIndex), 10) * 60 : 0;
    const seconds = sIndex !== -1 ? parseInt(pt.substr(mIndex+1, sIndex), 10) : 0;
    const duration = hoursToSec + minutesToSec + seconds;

    // console.log('tIndex: ', tIndex);
    // console.log('hIndex: ', hIndex);
    // console.log('mIndex: ', mIndex);
    // console.log('sIndex: ', sIndex);
    // console.log('hoursToSec: ', hoursToSec);
    // console.log('minutesToSec: ', minutesToSec);
    // console.log('seconds: ', seconds);
    // console.log('duration: ', duration);

    return duration;
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const videoList = await youtube.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 30,
        q: search,
        key: API_KEY
      }
    });
    const filteredVideoList = videoList.data.items.filter(video => video.id.videoId !== undefined);
    setSearchResult(filteredVideoList);
  }

  useEffect(() => {
    setDuration(convertPtToSec(durationPt));
  }, [durationPt])
  

  // console.log('searchResult: ', searchResult);
  // console.log("selectedVideo: ", selectedVideo);
  // console.log('durationPt: ', durationPt);
  // console.log('duration: ', duration);

  const chooseVideo = async (video) => {
    const { data: { items: { 0: videoDetails } } } = await youtube.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics,status',
        key: API_KEY,
        id: video.id.videoId,
      }
    });
    setSelectedVideo(videoDetails);
    setDurationPt(videoDetails.contentDetails.duration);
    await dispatch(addVideo(videoDetails, id, convertPtToSec(videoDetails.contentDetails.duration)));
    dispatch(fetchVideos(id));
    setSearch('');
    setSearchResult([]);
  }

  return (
    <div className={classes.videoSearchContainer}>
      <form onSubmit={handleSubmit}>
				<TextField
          className={classes.videoSearchInput}
					inputProps={{}}
					label="Search a song."
					variant="outlined"
					value={search}
					onChange={e => setSearch(e.target.value)}
				></TextField>
			</form>
      <div className={classes.songList}>
				{searchResult.map(video => (
          <YouTubeSearchList
            video={video}
            key={video.id.videoId}
            chooseVideo={chooseVideo}
          />
				))}
			</div>
    </div>
  );
}

export default YouTubeSearch;
