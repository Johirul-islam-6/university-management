import {
  IacademicSemesterTitele,
  IacademicSemestercode,
  IAcademicSemesterMonth,
} from './academicSemester.interface';

// academic semester titele
export const AcademicSemesterTitele: IacademicSemesterTitele[] = [
  'Autumn',
  'Summer',
  'Fall',
];
// academic semester code
export const AcademicSemestercode: IacademicSemestercode[] = ['01', '02', '03'];

export const AcademicSemesterMonth: IAcademicSemesterMonth[] = [
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

// condition semester

export const AcademicSemesterTitleCodeMapping: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableFields = ['year', 'code', 'title'];
