import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
// import AuthServices from "../auth/auth.service";
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import { ILoginUserResponse } from './auth.interface';
import config from '../../../config';

//create a user
const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loingUser(loginData);
  const { RefreshToken, ...others } = result;

  // =========set cookies refresh token =========
  const cokiesOption = {
    secure: config.evn === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', result.RefreshToken, cokiesOption);
  // delete result.RefreshToken
  if (RefreshToken) {
    delete result.RefreshToken;
  }

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfuly',
    data: others,
  });
});

// refresh token service
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  // =========set cookies refresh token =========
  const cokiesOption = {
    secure: config.evn === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cokiesOption);
  // delete result.RefreshToken
  // if (RefreshToken) {
  //   delete result.RefreshToken;
  // }

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfuly',
    data: result,
  });
});

// change password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const { ...passwordData } = req.body;
  await AuthServices.changePassword(user, passwordData);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user update password successfuly',
    // data: result,
  });
});

export const AuthController = {
  login,
  refreshToken,
  changePassword,
};
