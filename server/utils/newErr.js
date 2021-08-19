const newErr = (statusCode, message = statusCode) => {
  const err = new Error(message);
  err.status = statusCode;
  return err;
}

module.exports = newErr;
