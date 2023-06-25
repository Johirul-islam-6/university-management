import express from 'express';
import { CreateStudentController } from './student.controller';
import { StudentValidation } from './student.validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', CreateStudentController.getAllStudent);
router.get('/:id', CreateStudentController.getSingelStudent);
router.delete('/:id', CreateStudentController.deleteSingelStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.UpdateStudentZodSchema),
  CreateStudentController.updateStudent
);
export const StudentRoutes = router;
