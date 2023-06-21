import { Model } from 'mongoose';

export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IacademicSemesterTitele = 'Autumn' | 'Summer' | 'Fall';

export type IacademicSemestercode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: IacademicSemesterTitele;
  year: number;
  code: IacademicSemestercode;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
