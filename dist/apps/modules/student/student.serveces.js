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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.StudentService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const student_constant_1 = require('./student.constant');
const student_model_1 = require('./student.model');
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const ApiError_1 = require('../../../errors/ApiError');
const getAllStudents = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.HelperPagination.calculationPagination(
        paginationOptions
      );
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: student_constant_1.studentSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield student_model_1.Student.find(whereConditions)
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield student_model_1.Student.countDocuments(whereConditions);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleStudent = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findOne({ _id: id })
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');
    return result;
  });
const updateStudent = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield student_model_1.Student.findOne({ _id: id });
    if (!isExist) {
      throw new ApiError_1.ApiError(
        http_status_1.default.NOT_FOUND,
        'Student not found !',
        ''
      );
    }
    const { name, guardian, localGuardian } = payload,
      studentData = __rest(payload, ['name', 'guardian', 'localGuardian']);
    const updatedStudentData = Object.assign({}, studentData);
    // dynamically handling
    if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}`; // `name.fisrtName`
        updatedStudentData[nameKey] = name[key];
      });
    }
    if (guardian && Object.keys(guardian).length > 0) {
      Object.keys(guardian).forEach(key => {
        const guardianKey = `guardian.${key}`; // `guardian.fisrtguardian`
        updatedStudentData[guardianKey] = guardian[key]; // updatedStudentData['guardian.motherContactNo']=guardian[motherContactNo]
        // updatedStudentData --> object create --> guardian : { motherContactNo: 0177}
      });
    }
    if (localGuardian && Object.keys(localGuardian).length > 0) {
      Object.keys(localGuardian).forEach(key => {
        const localGuradianKey = `localGuardian.${key}`; // `localGuardian.fisrtName`
        updatedStudentData[localGuradianKey] = localGuardian[key];
      });
    }
    const result = yield student_model_1.Student.findOneAndUpdate(
      { _id: id },
      updatedStudentData,
      {
        new: true,
      }
    );
    return result;
  });
const deleteStudent = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findByIdAndDelete(id)
      .populate('academicSemester')
      .populate('academicDepartment')
      .populate('academicFaculty');
    return result;
  });
exports.StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
