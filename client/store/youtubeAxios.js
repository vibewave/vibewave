import axios from 'axios';
export const API_KEY = 'AIzaSyBU2Pp_7_LRBwmMjeWzbxBAFrptzCIB-Us';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
});


