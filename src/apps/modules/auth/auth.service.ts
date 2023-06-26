import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { User } from '../users/users.model';
import { IloginUser } from './auth.interface';
// import bcrypt from 'bcrypt';
const loingUser = async (payload: IloginUser) => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist', '');
  }
  // password matching bcrypt
  if (
    isUserExist.password &&
    !(await User?.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is Incorrect !', '');
  }

  return {};
};

export const AuthServices = {
  loingUser,
};
