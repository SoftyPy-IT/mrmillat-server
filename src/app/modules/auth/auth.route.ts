import express from 'express';
import { AuthValidation } from './auth.validation';
import { authControllers } from './auth.controller';
import validationRequest from '../../middlewares/validationRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  authControllers.loginUser,
);

router.post(
  '/change-password',
  auth('admin', 'editor'),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  authControllers.changePassword,
);

router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  authControllers.refreshToken,
);

export const authRoutes = router;
