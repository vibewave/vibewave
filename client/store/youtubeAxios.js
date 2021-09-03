import axios from 'axios';

export const { API_KEY } = process.env;

export default axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3/',
	// params: {
	//   part: 'snippet,contentDetails,statistics,status',
	//   maxResults: 20,
	//   key: API_KEY
	// }
});
