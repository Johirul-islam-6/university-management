import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './zodAcademicSemester.validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.AcademicSemesterZodSchema),
  AcademicSemesterController.CreateAcademicSemester
);

export const SemesterRoute = router;
