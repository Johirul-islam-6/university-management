import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './zodAcademicSemester.validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

// router.post(
//   '/create-semester',
//   validateRequest(AcademicSemesterValidation.AcademicSemesterZodSchema),
//   AcademicSemesterController.CreateAcademicSemester
// );
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.UpdateAcademicSemesterSchema),
  AcademicSemesterController.updateSemester
);

router.get('/', AcademicSemesterController.getAllSemester);
router.get('/:id', AcademicSemesterController.getSingelSemester);
router.delete('/:id', AcademicSemesterController.DeleteSingelSemester);

export const SemesterRoute = router;
