import httpStatus from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { User } from '../users/users.model';
import {
  IChangePassword,
  ILoginUserResponse,
  IRefreshToken,
  IloginUser,
} from './auth.interface';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

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
  // ========================= jwt token start ============================
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

const refreshToken = async (token: string): Promise<IRefreshToken> => {
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config.JWT.refresh_secret as Secret
    ) as jwt.JwtPayload;
    // console.log(verifiedToken)
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token', '');
  }

  const { userId } = verifiedToken;

  // checking refresh token user checked database user
  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist !', '');
  }
  // create jwt access token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.JWT.secret as Secret,
    config.JWT.expires_in as string
  );
  return {
    AccessToken: newAccessToken,
  };
};

// change password

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  // const isUserExist = await User.isUserExist(user?.userId)
  // alternative way
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist', '');
  }
  //checking old password
  if (
    isUserExist.password &&
    !(await User?.isPasswordMatch(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Old Password is Incorrect !',
      ''
    );
  }

  //// alternative way

  // // bcrypt hashing password
  // const newHashingPassword = await bcrypt.hash(newPassword,Number(config.bcrypt_numbers as string))

  // // update password
  // const updateData = {
  //   password : newHashingPassword,
  //   needPasswordChange : false,
  //   passwordChangeAT : new Date()
  // }
  //  await User.findOneAndUpdate({id : user?.userId}, updateData)

  // updatein save method
  isUserExist.needPasswordChange = false;
  isUserExist.password = newPassword;
  isUserExist.save();
};

export const AuthServices = {
  loingUser,
  refreshToken,
  changePassword,
};
