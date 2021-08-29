const router = require('express').Router();
const {
	models: { Track },
} = require('../../db');

router.get('/:roomId', async (req, res, next) => {
	try {
		const tracks = await Track.findAll({
			where: { roomId: req.params.roomId },
		});
		res.send(tracks);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const track = await Track.create(req.body);
		res.send(track);
	} catch (error) {
		next(error);
	}
});

router.delete('/:trackId', async (req, res, next) => {
	try {
		await Track.destroy({
			where: {
				id: req.params.trackId
			}
		});
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
