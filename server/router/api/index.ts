const router = require('express').Router();
module.exports = router;
import { MiddlewareFn } from '../../../my-types';

/* Add route middlewares below. For example:
router.use('/user', require('./routes/user'));
...
*/

// ERROR HANDLER
router.use(<MiddlewareFn>function (req, res, next) {
	const err = new Error('404: Not Found');
	res.status(404);
	next(err);
});
