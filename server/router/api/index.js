const router = require('express').Router();

/* Add route middlewares below. For example:
router.use('/user', require('./routes/user'));
...
*/

router.use('/users', require('./users'));
router.use('/rooms', require('./rooms'));
router.use('/videos', require('./videos'));
router.use('/messages', require('./messages'));
// ERROR HANDLER
router.use((req, res, next) => {
	const err = new Error('404: Not Found');
	res.status(404);
	next(err);
});

module.exports = router;
