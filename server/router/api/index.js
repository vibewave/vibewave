const router = require('express').Router();

/* Add route middlewares below. For example:
router.use('/user', require('./routes/user'));
...
*/

// ERROR HANDLER
router.use((req, res, next) => {
	const err = new Error('404: Not Found');
	res.status(404);
	next(err);
});

module.exports = router;
