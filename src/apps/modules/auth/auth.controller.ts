import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
// import AuthServices from "../auth/auth.service";
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import { ILoginUserResponse } from './auth.interface';
import config from '../../../config';

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

export const AuthController = {
  login,
};
