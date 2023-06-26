import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { User } from '../users/users.model';
import { ILoginUserResponse, IloginUser } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
// import bcrypt from 'bcrypt';
const loingUser = async (payload: IloginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // static method usered resive id
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

  // create access token
  const { id: userId, role, needPasswordChange } = isUserExist;
  const AccessToken = jwtHelpers.createToken(
    { userId, role },
    config.JWT.secret as Secret,
    config.JWT.expires_in as string
  );

  // create  refresh token
  const RefreshToken = jwtHelpers.createToken(
    { userId, role },
    config.JWT.refresh_secret as Secret,
    config.JWT.refresh_expires_in as string
  );
  // console.log({AccessToken, RefreshToken,needPasswordChange})

  return {
    AccessToken,
    RefreshToken,
    needPasswordChange,
  };
};

export const AuthServices = {
  loingUser,
};
