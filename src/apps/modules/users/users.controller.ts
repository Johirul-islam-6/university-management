import { NextFunction, Request, Response } from 'express';
import { UserServices } from './users.service';
import { catchAsync } from '../../middlewares/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const singelUserCreated = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserServices.createdUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'A User created successfully',
    });
    next();
  }
);

export const CreateUserController = {
  singelUserCreated,
};
