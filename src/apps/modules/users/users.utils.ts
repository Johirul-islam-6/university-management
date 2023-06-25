import { IAcademicSemester } from '../academic_Semester/academicSemester.interface';

import { User } from './users.model';

// find database last student Id serial
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id ? lastUser.id.substring(4) : undefined;
};

// create a student serial Id number generate
export const generateStudentId = async (
  AcademicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); // 00000
  //incementUserId

  let incementuserId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incementuserId = `${AcademicSemester?.year.substring(2)}${
    AcademicSemester?.code
  }${incementuserId}`;

  return incementuserId;
};

// faculty utility
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

// create a Faculty serial Id number generate
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0'); // 00000
  //incementUserId

  let incementuserId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incementuserId = `F-${incementuserId}`;

  return incementuserId;
};

// admin
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
