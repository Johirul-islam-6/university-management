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
exports.AcademicSemester = void 0;
const mongoose_1 = require('mongoose');
const mongoose_2 = require('mongoose');
const academic_constant_1 = require('./academic.constant');
const ApiError_1 = require('../../../errors/ApiError');
const http_status_1 = __importDefault(require('http-status'));
const academicSemesterModel = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: academic_constant_1.AcademicSemesterTitele,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academic_constant_1.AcademicSemestercode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academic_constant_1.AcademicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academic_constant_1.AcademicSemesterMonth,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// this is same semester same year not anty database
academicSemesterModel.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    const isExist = yield exports.AcademicSemester.findOne({
      title: this.title,
      year: this.year,
    });
    if (isExist) {
      throw new ApiError_1.ApiError(
        http_status_1.default.CONFLICT,
        'Academic Semester already Exist !',
        ''
      );
    }
    next();
  });
});
// 3. Create a Model.
exports.AcademicSemester = (0, mongoose_2.model)(
  'AcademicSemester',
  academicSemesterModel
);
