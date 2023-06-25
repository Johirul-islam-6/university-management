import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './users.service';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './users.interface';
import { User } from './users.model';
// create a student
const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = req.body;
    const result = await UserServices.createdStuden(student, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'A User created successfully',
    });
    next();
  }
);
// create a faculty
const createFaculy: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await UserServices.createFaculty(faculty, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);
// admin user controller
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserServices.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);

//get all users
const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await User.find({});
    res.send(result);
  }
);

export const CreateUserController = {
  createStudent,
  createFaculy,
  createAdmin,
  getAllUsers,
};
