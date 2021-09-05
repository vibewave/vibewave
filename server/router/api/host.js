const router = require('express').Router();
const {
	models: {
    User,
    Room
  },
} = require('../../db');
module.exports = router;


// GET /api/host/:roomId
router.get('/:roomId', async (req, res, next) => {
	try {
    const room = await Room.findByPk(req.params.roomId);
		const user = await User.findByPk(room.hostId);
		res.json(user);
	} catch (err) {
		next(err);
	}
});
