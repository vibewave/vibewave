import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import youtube from '../../store/youtubeAxios';
import { API_KEY } from '../../store/youtubeAxios'

const YouTubeSearch = () => {
  // const classes = useStyles();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [videoInfo, setVideoInfo] = useState({});
  const [durationMs, setDurationMs] = useState(0);
  const [durationPt, setDurationPt] = useState('');

  const convertPtToMs = (pt) => {
    const tIndex = pt.indexOf('T');
    const mIndex = pt.indexOf('M');
    const sIndex = pt.indexOf('S');
    const minutesMs = parseInt(pt.substr(tIndex+1, mIndex), 10) * 60 * 1000;
    const secondsMs = parseInt(pt.substr(mIndex+1, sIndex), 10) * 1000;
    const durationMs = minutesMs + secondsMs;

    console.log('pt: ', pt);
    console.log('tIndex: ', tIndex);
    console.log('mIndex: ', mIndex);
    console.log('sIndex: ', sIndex);
    console.log('minutesMs: ', minutesMs);
    console.log('secondsMs: ', secondsMs);
    console.log('durationMS: ', durationMs);
    return durationMs;
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const videoList = await youtube.get('/search', {
      params: {
        part: 'snippet',
        maxResults: 20,
        q: search,
        key: API_KEY
      }
    });
    setSearchResult(videoList);
    const videoDetails = await youtube.get('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics,status',
        key: API_KEY,
        id: videoList.data.items[0].id.videoId,
      }
    });
    setVideoInfo(videoDetails);
    setDurationPt(videoDetails.data.items[0].contentDetails.duration);
  }

  useEffect(() => {
    console.log('searchResult: ', searchResult);
    console.log("videoInfo: ", videoInfo);
    console.log('durationPt: ', durationPt);
    console.log('durationMs: ', durationMs);

    setDurationMs(convertPtToMs(durationPt));
  }, [durationPt])

  return (
    <div>
      <form onSubmit={handleSubmit}>
				<TextField
					className=''
					inputProps={{}}
					label="Search a song."
					variant="outlined"
					value={search}
					onChange={e => setSearch(e.target.value)}
				></TextField>
			</form>
    </div>
  );
}

export default YouTubeSearch;