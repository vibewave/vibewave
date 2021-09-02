const router = require('express').Router();
const {
	models: { Video },
} = require('../../db');

router.get('/:roomId', async (req, res, next) => {
	try {
		const videos = await Video.findAll({
			where: { roomId: req.params.roomId },
		});
		res.send(videos);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const video = await Video.create(req.body);
		res.send(video);
	} catch (error) {
		next(error);
	}
});

router.delete('/:videoId', async (req, res, next) => {
	try {
		await Video.destroy({
			where: {
				id: req.params.videoId
			}
		});
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
