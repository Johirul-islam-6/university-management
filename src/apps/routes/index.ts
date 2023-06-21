import express from 'express';
import { UserRoutes } from '../modules/users/users.routes';
import { SemesterRoute } from '../modules/academic_Semester/academicSemester.routes';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
