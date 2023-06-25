import status from 'http-status';
import { ApiError } from '../../../errors/ApiError';
import {
  AcademicSemesterTitleCodeMapping,
  academicSemesterSearchableFields,
} from './academic.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
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

// get semester data querys
const getAllSemesterServe = async (
  filtering: IAcademicSemesterFilters,
  paginationOption: IPaginationOpton
): Promise<IGenaricRespons<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filtering;

  const andConditions = [];

  // serchdata resive
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // filter data resive
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const {searchTerm} = filtering;
  // const andCodition = [
  // {
  //    $or : [
  //   {
  //     title : {
  //       $regex : searchTerm,
  //       $options :'i',
  //     },
  //   },
  //   {
  //     code : {
  //       $regex : searchTerm,
  //       $options :'i',
  //     },
  //   },
  //   {
  //     year : {
  //       $regex : searchTerm,
  //       $options :'i',
  //     },
  //   },
  //  ],
  // }
  // ]

  const { page, limit, skip, sortBy, sortOrder } =
    HelperPagination.calculationPagination(paginationOption);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // condition display data show
  const whereConditons =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditons)
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

//singel a semester
const singelSemester = async (
  semesterId: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findOne({ _id: semesterId });
  return result;
};

// update semester
const updateSemester = async (
  semesterId: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  // const id = { _id : semesterId};
  // checking semester final title and code
  if (
    payload.title &&
    payload.code &&
    AcademicSemesterTitleCodeMapping[payload.title] !== payload.code
  ) {
    throw new ApiError(
      status.BAD_REQUEST,
      'semester name not matching semester code',
      ''
    );
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: semesterId },
    payload,
    { new: true }
  );
  return result;
};

//delet semester
const DeleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const semesterId = { _id: id };
  const result = await AcademicSemester.findByIdAndDelete(semesterId, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemester,
  getAllSemesterServe,
  singelSemester,
  updateSemester,
  DeleteSemester,
};
