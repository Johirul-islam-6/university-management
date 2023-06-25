import express from 'express';
import { CreateUserController } from './users.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  CreateUserController.createStudent
);
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  CreateUserController.createFaculy
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  CreateUserController.createAdmin
);

router.get('/', CreateUserController.getAllUsers);

export const UserRoutes = router;
