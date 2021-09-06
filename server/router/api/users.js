const router = require('express').Router();
const {
	models: { User },
} = require('../../db');
module.exports = router;

router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll({
			attributes: ['id', 'username'],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

router.put('/:userId', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.userId);
		await user.update({ roomId: req.body.roomId });
		res.json(user);
	} catch (err) {
		next(err);
	}
});
