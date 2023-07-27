"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterSearchableFields = exports.AcademicSemesterTitleCodeMapping = exports.AcademicSemesterMonth = exports.AcademicSemestercode = exports.AcademicSemesterTitele = void 0;
// academic semester titele
exports.AcademicSemesterTitele = [
    'Autumn',
    'Summer',
    'Fall',
];
// academic semester code
exports.AcademicSemestercode = ['01', '02', '03'];
exports.AcademicSemesterMonth = [
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
exports.AcademicSemesterTitleCodeMapping = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
};
exports.academicSemesterSearchableFields = ['year', 'code', 'title'];
