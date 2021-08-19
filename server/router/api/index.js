const router = require('express').Router();
module.exports = router;

/* Add route middlewares below. For example:
router.use('/user', require('./routes/user'));
...
*/

// ERROR HANDLER
router.use((req, res, next) => {
  const err = new Error('404: Not Found');
  err.status = 404;
  next(err);
});
