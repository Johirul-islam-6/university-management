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
exports.UserServices = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
const index_1 = __importDefault(require('../../../config/index'));
const academicSemester_model_1 = require('../academic_Semester/academicSemester.model');
const users_model_1 = require('./users.model');
const users_utils_1 = require('./users.utils');
const student_model_1 = require('../student/student.model');
const ApiError_1 = require('../../../errors/ApiError');
const http_status_1 = __importDefault(require('http-status'));
const faculty_model_1 = require('../faculty/faculty.model');
const admin_model_1 = require('../admin/admin.model');
const createdStuden = (student, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // auto genarate password
    if (!user.password) {
      user.password = index_1.default.default_student_password;
    }
    // set role genarate
    user.role = 'student';
    const academecsemester =
      yield academicSemester_model_1.AcademicSemester.findById(
        student.academicSemester
      );
    // 01--> session start
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const id = yield (0, users_utils_1.generateStudentId)(academecsemester);
      user.id = id;
      student.id = id;
      //02. sessiot create a studen
      const newStudent = yield student_model_1.Student.create([student], {
        session,
      });
      if (!newStudent.length) {
        throw new ApiError_1.ApiError(
          http_status_1.default.BAD_REQUEST,
          'fail to create student',
          ''
        );
      }
      //03. sessiot create a studen
      user.student = newStudent[0]._id;
      const newUser = yield users_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.ApiError(
          http_status_1.default.BAD_REQUEST,
          'fail to create user',
          ''
        );
      }
      newUserAllData = newUser[0];
      // 0.4 session commit transaction
      yield session.commitTransaction();
      //05 session endsession
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield users_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'student',
        populate: [
          { path: 'academicSemester' },
          { path: 'academicDepartment' },
          { path: 'academicFaculty' },
        ],
      });
    }
    return newUserAllData;
  });
// get faculty users
const createFaculty = (faculty, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // default password
    if (!user.password) {
      user.password = index_1.default.default_faculty_pass;
    }
    // set role
    user.role = 'faculty';
    // generate faculty id
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const id = yield (0, users_utils_1.generateFacultyId)();
      user.id = id;
      faculty.id = id;
      const newFaculty = yield faculty_model_1.Faculty.create([faculty], {
        session,
      });
      if (!newFaculty.length) {
        throw new ApiError_1.ApiError(
          http_status_1.default.BAD_REQUEST,
          'Failed to create faculty ',
          ''
        );
      }
      user.faculty = newFaculty[0]._id;
      const newUser = yield users_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.ApiError(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user',
          ''
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield users_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'faculty',
        populate: [
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      });
    }
    return newUserAllData;
  });
// create admin
const createAdmin = (admin, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // default password
    if (!user.password) {
      user.password = index_1.default.default_admin_pass;
    }
    // user bcrypt # password security
    // set role
    user.role = 'admin';
    // generate faculty id
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const id = yield (0, users_utils_1.generateAdminId)();
      user.id = id;
      admin.id = id;
      const newAdmin = yield admin_model_1.Admin.create([admin], { session });
      if (!newAdmin.length) {
        throw new ApiError_1.ApiError(
          http_status_1.default.BAD_REQUEST,
          'Failed to create faculty ',
          ''
        );
      }
      user.admin = newAdmin[0]._id;
      const newUser = yield users_model_1.User.create([user], { session });
      if (!newUser.length) {
        throw new ApiError_1.ApiError(
          http_status_1.default.BAD_REQUEST,
          'Failed to create admin',
          ''
        );
      }
      newUserAllData = newUser[0];
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    if (newUserAllData) {
      newUserAllData = yield users_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'admin',
        populate: [
          {
            path: 'managementDepartment',
          },
        ],
      });
    }
    return newUserAllData;
  });
// export file
exports.UserServices = {
  createdStuden,
  createFaculty,
  createAdmin,
};
