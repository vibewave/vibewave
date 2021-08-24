import { ApiError } from '../../my-types';

export const changeErrStatus = (statusCode: number, err: ApiError) => {
  err.status = statusCode;
  return err;
}

// module.exports = changeErrStatus;
