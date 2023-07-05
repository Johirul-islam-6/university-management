import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validataion';
import { AuthController } from './auth.controller';
import { atuthValidationRoute } from '../../middlewares/authValidtaionRoute';
import { ENUM_USER_ROLE } from '../../../enums/user';
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
router.patch(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  atuthValidationRoute(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AuthController.changePassword
);

export const authRoutes = router;
