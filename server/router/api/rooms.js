const router = require('express').Router();
const {
	models: { Room },
} = require('../../db');

//GET /api/rooms return all rooms
router.get('/', async (req, res, next) => {
	try {
		const rooms = await Room.findAll();
		res.send(rooms);
	} catch (err) {
		next(err);
	}
});

//POST /api/rooms create a new room
router.post('/', async (req, res, next) => {
	try {
		const room = await Room.create(req.body);
		res.send(room);
	} catch (err) {
		next(err);
	}
});

// GET /api/rooms/:id return a specific room
router.get('/:id', async (req, res, next) => {
	try {
		const room = await Room.findByPk(req.params.id);
		res.send(room);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
