const newErr = (statusCode, message = statusCode) => {
  const err = new Error(statusCode, message);
  err.status = statusCode;
  return err;
}

module.exports = newErr;
