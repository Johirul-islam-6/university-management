import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
// import AuthServices from "../auth/auth.service";
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import { ILoginUserResponse } from './auth.interface';

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loingUser(loginData);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfuly',
    data: result,
  });
});

export const AuthController = {
  login,
};
