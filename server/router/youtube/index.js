const router = require('express').Router();
const axios = require('axios');
module.exports = router;

const youtube = axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3/',
});

//post /youtube/search
router.post('/search', async (req, res, next) => {
	try {
		const videoList = await youtube.get('/search', {
			params: {
				part: 'snippet',
				maxResults: 20,
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
