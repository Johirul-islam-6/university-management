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
exports.FacultyController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const faculty_constant_1 = require('./faculty.constant');
const faculty_service_1 = require('./faculty.service');
const catchAsync_1 = require('../../../shared/catchAsync');
const quaryPick_1 = require('../../../shared/quaryPick');
const pagination_1 = require('../../constant/pagination');
const sendResponse_1 = require('../../../shared/sendResponse');
const getAllFaculties = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, quaryPick_1.queryPick)(
      req.query,
      faculty_constant_1.facultyFilterableFields
    );
    const paginationOptions = (0, quaryPick_1.queryPick)(
      req.query,
      pagination_1.pagintionField
    );
    const result = yield faculty_service_1.FacultyService.getAllFaculties(
      filters,
      paginationOptions
    );
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'faculties retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  })
);
const getSingleFaculty = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_service_1.FacultyService.getSingleFaculty(id);
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'faculty retrieved successfully !',
      data: result,
    });
  })
);
const updateFaculty = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield faculty_service_1.FacultyService.updateFaculty(
      id,
      updatedData
    );
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'faculty updated successfully !',
      data: result,
    });
  })
);
const deleteFaculty = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faculty_service_1.FacultyService.deleteFaculty(id);
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'faculty deleted successfully !',
      data: result,
    });
  })
);
exports.FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
