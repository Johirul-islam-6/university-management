import { Schema } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import { model } from 'mongoose';

const Month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const userSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Summer', 'Fall'],
    },
    year: {
      type: Number,
      required: true,
    },

    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: Month,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Month,
    },
  },
  { timestamps: true }
);

// 3. Create a Model.
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'User',
  userSchema
);
