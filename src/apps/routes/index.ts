import express from 'express';
import { UserRoutes } from '../modules/users/users.routes';
import { SemesterRoute } from '../modules/academic_Semester/academicSemester.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: SemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
