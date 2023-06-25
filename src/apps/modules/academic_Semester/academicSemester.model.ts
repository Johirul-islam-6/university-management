import { Schema } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import { model } from 'mongoose';
import {
  AcademicSemesterMonth,
  AcademicSemesterTitele,
  AcademicSemestercode,
} from './academic.constant';
import { ApiError } from '../../../errors/ApiError';
import status from 'http-status';

const academicSemesterModel = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterTitele,
    },
    year: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      enum: AcademicSemestercode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonth,
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
academicSemesterModel.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(
      status.CONFLICT,
      'Academic Semester already Exist !',
      ''
    );
  }
  next();
});

// 3. Create a Model.
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterModel
);
