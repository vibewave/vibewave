const router = require('express').Router();
const axios = require('axios');
module.exports = router;

const youtube = axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3/',
});

console.log('inside youtube routes');

// const { data: { items: { 0: videoDetails } } } = await youtube.get('/videos', {
//   params: {
//     part: 'snippet,contentDetails,statistics,status',
//     key: API_KEY,
//     id: video.id.videoId,
//   }
// });

//post /youtube
router.post('/search', async (req, res, next) => {
	console.log('search on req body is ', req.body.search);
	try {
		const videoList = await youtube.get('/search', {
			params: {
				part: 'snippet',
				maxResults: 30,
				q: req.body.search,
				key: process.env.API_KEY,
			},
		});
		const filteredVideoList = videoList.data.items.filter(
			video => video.id.videoId !== undefined
		);

		res.send(filteredVideoList);
	} catch (err) {
		next(err);
	}
});
