import status from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { AcademicSemesterTitleCodeMapping } from './academic.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  // checking semester final title and code
  if (AcademicSemesterTitleCodeMapping[payload.title] !== payload.code) {
    throw new ApiError(
      status.BAD_REQUEST,
      'semester name not matching semester code',
      ''
    );
  }

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
};
