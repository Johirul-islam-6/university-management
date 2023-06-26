import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validataion';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.authZodSchema),
  AuthController.login
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshtokenZodSchema),
  AuthController.refreshToken
);

export const authRoutes = router;
