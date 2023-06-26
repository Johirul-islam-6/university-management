import { NextFunction, Request, RequestHandler, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { queryPick } from '../../../shared/quaryPick';
import { pagintionField } from '../../constant/pagination';
import { IStudent } from './student.interface';
import { StudentService } from './student.serveces';

// const CreateAcademicSemester = catchAsync(
//   async (req: Request, res: Response) => {
//     const { ...academicSemester } = req.body;
//     // console.log("first", academicSemester)
//     const result = await Student.createAcademicSemester(
//       academicSemester
//     );

//     // create a senrespons function
//     sendResponse<IStudent[]>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       data: result.data,
//       meta: result.meta,
//       message: 'Academic Semester created successfully',
//     });

//     // next();
//   }
// );

// pagination limite academic semester

const getAllStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filtering = queryPick(req.query, [
      'searchTerm',
      'title',
      'code',
      'year',
    ]);
    const paginationOption = queryPick(req.query, pagintionField);
    // console.log(paginationOption)

    const result = await StudentService.getAllStudents(
      filtering,
      paginationOption
    );

    // create a senrespons function
    sendResponse<IStudent[]>(res, {
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
const getSingelStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const semester = req.params.id;
    const result = await StudentService.getSingleStudent(semester);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'A singel semester Show the display successfully',
    });
  }
);

// Update singel semester
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const studentid = req.params.id;
  const updateData = req.body;
  const result = await StudentService.updateStudent(studentid, updateData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'A singel semester updated successfully',
  });
});

const deleteSingelStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: 'A singel semester Delete successfully',
  });
});

export const CreateStudentController = {
  getSingelStudent,
  getAllStudent,
  deleteSingelStudent,
  updateStudent,
};
