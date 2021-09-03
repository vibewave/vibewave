const router = require('express').Router();
const {
	models: { Room, User },
} = require('../../db');
const { newErr } = require('../../utils');

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

// GET /api/rooms/:id return a specific room and users of that room
router.get('/:roomId', async (req, res, next) => {
	try {
		const roomAndUsers = await Room.findOne({
			include: [{
				model: User,
				where: {
					roomId: req.params.roomId,
				},
			}],
		});
		if (!roomAndUsers) {
			const err = newErr(404, `Page Not Found: Room ${req.params.roomId} is not available.`);
			throw err;
		}
		res.send(roomAndUsers);
	} catch (err) {
		next(err);
	}
});

// DELETE /api/rooms/:id
router.delete('/:roomId', async (req, res, next) => {
	try {
		const room = await Room.findByPk(req.params.roomId);
		await room.destroy();
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
