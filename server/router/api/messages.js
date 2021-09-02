const router = require('express').Router();
const {
	models: { Message, User },
} = require('../../db');

module.exports = router;

//POST /api/messages create message with specified room and user
router.post('/', async (req, res, next) => {
	try {
		const message = await Message.create(req.body);
		res.send(message);
	} catch (e) {
		next(e);
	}
});

//GET /api/messages/:roomId
router.get('/:roomId', async (req, res, next) => {
	try {
		const messages = await Message.findAll({
			where: { roomId: req.params.roomId },
			include: User,
		});
		sortedMessages = messages.sort((a, b) => a.id - b.id);
		res.send(sortedMessages);
	} catch (e) {
		next(e);
	}
});
