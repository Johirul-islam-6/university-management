import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.service';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { queryPick } from '../../../shared/quaryPick';
import { pagintionField } from '../../constant/pagination';
import { IAcademicSemester } from './academicSemester.interface';

const CreateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemester } = req.body;
    // console.log("first", academicSemester)
    const result = await AcademicSemesterServices.createAcademicSemester(
      academicSemester
    );

    // create a senrespons function
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result.data,
      meta: result.meta,
      message: 'Academic Semester created successfully',
    });

    // next();
  }
);

// pagination limite academic semester
const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filtering = queryPick(req.query, [
      'searchTerm',
      'title',
      'code',
      'year',
    ]);
    const paginationOption = queryPick(req.query, pagintionField);
    // console.log(paginationOption)

    const result = await AcademicSemesterServices.getAllSemesterServe(
      filtering,
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

//get singel semester
const getSingelSemester = catchAsync(async (req: Request, res: Response) => {
  const semester = req.params.id;
  const result = await AcademicSemesterServices.singelSemester(semester);

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'A singel semester Show the display successfully',
  });
});

// Update singel semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const semesterid = req.params.id;
  const updateData = req.body;
  const result = await AcademicSemesterServices.updateSemester(
    semesterid,
    updateData
  );
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'A singel semester updated successfully',
  });
});

const DeleteSingelSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterServices.DeleteSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'A singel semester Delete successfully',
  });
});

export const AcademicSemesterController = {
  CreateAcademicSemester,
  getAllSemester,
  getSingelSemester,
  updateSemester,
  DeleteSingelSemester,
};
