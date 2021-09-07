const router = require('express').Router();
const {
	models: { Video },
} = require('../../db');

// GET /api/videos/?roomId={roomId}&isRequested=true
router.get('/', async (req, res, next) => {
	const roomId = req.query.roomId;
	const isRequested = req.query.isRequested;

	try {
		const requestedVideos = await Video.findAll({
			where: {
				roomId,
				isRequested,
			},
		});
		res.send(requestedVideos);
	} catch (error) {
		next(error);
	}
});

// DELETE /api/videos/?videoId={videoId}&isRequested=true
router.delete('/', async (req, res, next) => {
	const videoId = req.query.videoId;
	const isRequested = req.query.isRequested;

	try {
		await Video.destroy({
			where: {
				id: videoId,
				isRequested,
			},
		});
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

// GET /api/videos/:roomId
router.get('/:roomId', async (req, res, next) => {
	try {
		const videos = await Video.findAll({
			where: {
				roomId: req.params.roomId,
				isRequested: false,
			},
		});
		sortedVideo = videos.sort((a, b) => a.id - b.id);
		res.send(videos);
	} catch (error) {
		next(error);
	}
});

// PUT /api/videos/:roomId
router.put('/:roomId', async (req, res, next) => {
	try {
		// Get single video
		const video = await Video.findByPk(req.body.id);
		// Update single video
		await video.update({
			isRequested: req.body.isRequested,
		});
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
});

// POST /api/videos
router.post('/', async (req, res, next) => {
	try {
		const video = await Video.create(req.body);
		res.send(video);
	} catch (error) {
		next(error);
	}
});

// DELETE /api/videos/:videoId
router.delete('/:videoId', async (req, res, next) => {
	try {
		await Video.destroy({
			where: {
				id: req.params.videoId,
			},
		});
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
