import { ApiError } from '../../my-types';

const newErr = (statusCode: number, message:string = statusCode.toString()) => {
  const err = new ApiError(statusCode, message);
  // err.status = statusCode;
  return err;
}

module.exports = newErr;
