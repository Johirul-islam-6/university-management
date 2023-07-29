'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreateStudentController = void 0;
const catchAsync_1 = require('../../../shared/catchAsync');
const sendResponse_1 = require('../../../shared/sendResponse');
const http_status_1 = __importDefault(require('http-status'));
const quaryPick_1 = require('../../../shared/quaryPick');
const pagination_1 = require('../../constant/pagination');
const student_serveces_1 = require('./student.serveces');
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
const getAllStudent = (0, catchAsync_1.catchAsync)((req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filtering = (0, quaryPick_1.queryPick)(req.query, [
      'searchTerm',
      'title',
      'code',
      'year',
    ]);
    const paginationOption = (0, quaryPick_1.queryPick)(
      req.query,
      pagination_1.pagintionField
    );
    // console.log(paginationOption)
    const result = yield student_serveces_1.StudentService.getAllStudents(
      filtering,
      paginationOption
    );
    // create a senrespons function
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      meta: result.meta,
      data: result.data,
      message: 'Academic Semester data display successfully',
    });
    next();
  })
);
//get singel semester
const getSingelStudent = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const semester = req.params.id;
    const result = yield student_serveces_1.StudentService.getSingleStudent(
      semester
    );
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: result,
      message: 'A singel semester Show the display successfully',
    });
  })
);
// Update singel semester
const updateStudent = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const studentid = req.params.id;
    const updateData = req.body;
    const result = yield student_serveces_1.StudentService.updateStudent(
      studentid,
      updateData
    );
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: result,
      message: 'A singel semester updated successfully',
    });
  })
);
const deleteSingelStudent = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield student_serveces_1.StudentService.deleteStudent(id);
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: result,
      message: 'A singel semester Delete successfully',
    });
  })
);
exports.CreateStudentController = {
  getSingelStudent,
  getAllStudent,
  deleteSingelStudent,
  updateStudent,
};
