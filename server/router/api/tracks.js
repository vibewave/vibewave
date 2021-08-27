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
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const track = await Track.create(req.body);
		res.send(track.trackUri);
	} catch (error) {
		next(err);
	}
});

module.exports = router;
