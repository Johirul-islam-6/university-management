import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.service';
import { catchAsync } from '../../middlewares/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const CreateAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ...academicSemester } = req.body;
      // console.log("first", academicSemester)
      const result = await AcademicSemesterServices.createAcademicSemester(
        academicSemester
      );

      // create a senrespons function
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: 'Academic Semester created successfully',
      });
    } catch (error) {
      next(error);
    }
  }
);

export const AcademicSemesterController = {
  CreateAcademicSemester,
};
