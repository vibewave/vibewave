import axios from 'axios';
export const API_KEY = 'AIzaSyBU2Pp_7_LRBwmMjeWzbxBAFrptzCIB-Us';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  // params: {
  //   part: 'snippet,contentDetails,statistics,status',
  //   maxResults: 20,
  //   key: API_KEY
  // }
});


