import { NextFunction, Request, Response } from 'express';
import { UserServices } from './users.service';
import { catchAsync } from '../../../shared/catchAsync';
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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  // const filtering = queryPick(req.query, ['searchTerm']);
  // const paginationOption = queryPick(req.query, pagintionField);

  const result = await UserServices.getAllUserServec();

  // const result = await User.find({});

  //  sendResponse<IAcademicSemester[]>(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   // meta: result.meta,
  //   data: result,
  //   message: 'Get all user successfully',
  // });
  res.send(result);
});

export const CreateUserController = {
  singelUserCreated,
  getAllUsers,
};
