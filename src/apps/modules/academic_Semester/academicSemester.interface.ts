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
  meta: { page: number; limit: number; total: number } | undefined;
  data: IAcademicSemester[] | null | undefined;
  title: IacademicSemesterTitele;
  year: string;
  code: IacademicSemestercode;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
};

export type IAcademicSemesterFilters = {
  searchTerm?: string;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
