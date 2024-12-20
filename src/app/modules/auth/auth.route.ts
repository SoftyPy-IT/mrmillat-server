import express from 'express';
import { AuthValidation } from './auth.validation';
import { authControllers } from './auth.controller';
import validationRequest from '../../middlewares/validationRequest';

const router = express.Router();

router.post('/login',
  validationRequest(AuthValidation.loginValidationSchema),authControllers.loginUser
);




export const AuthRoutes = router;
