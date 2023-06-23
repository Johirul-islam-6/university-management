import express from 'express';
import { CreateUserController } from './users.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  CreateUserController.singelUserCreated
);
router.get('/', CreateUserController.getAllUsers);

export const UserRoutes = router;
