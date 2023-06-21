import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.service';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { queryPick } from '../../../shared/quaryPick';
import { pagintionField } from '../../constant/pagination';
import { IAcademicSemester } from './academicSemester.interface';

const CreateAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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

    next();
  }
);

// pagination limite academic semester
const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOption = queryPick(req.query, pagintionField);
    // console.log(paginationOption)

    const result = await AcademicSemesterServices.getAllSemesterServe(
      paginationOption
    );

    // create a senrespons function
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: result.meta,
      data: result.data,
      message: 'Academic Semester data display successfully',
    });

    next();
  }
);

export const AcademicSemesterController = {
  CreateAcademicSemester,
  getAllSemester,
};
