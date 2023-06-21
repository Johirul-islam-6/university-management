import express from 'express';
import { UserRoutes } from '../modules/users/users.routes';
import { SemesterRoute } from '../modules/academic_Semester/academicSemester.routes';

const router = express.Router();

const moduleRouter = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: SemesterRoute,
  },
];

moduleRouter.forEach(route => router.use(route.path, route.route));

// User router
router.use('/users', UserRoutes);
// academic semester route
router.use('/academic-semester', SemesterRoute);

export default router;
