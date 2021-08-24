const changeErrStatus = (statusCode, err) => {
  err.status = statusCode;
  return err;
}

module.exports = changeErrStatus;
