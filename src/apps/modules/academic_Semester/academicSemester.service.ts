import status from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import { AcademicSemesterTitleCodeMapping } from './academic.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOpton } from '../../../interfaces/pagination';
import { IGenaricRespons } from '../../../interfaces/common';
import { HelperPagination } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

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

// get semester data
const getAllSemesterServe = async (
  paginationOption: IPaginationOpton
): Promise<IGenaricRespons<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    HelperPagination.calculationPagination(paginationOption);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterServices = {
  createAcademicSemester,
  getAllSemesterServe,
};
