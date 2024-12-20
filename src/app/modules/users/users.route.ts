import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { userValidation } from './users.validation';
import { UserControllers } from './users.controllers';
const router = express.Router();

router.post('/create-user',validationRequest(userValidation.createUserValidationSchema), UserControllers.createUser);

router.get('/', UserControllers.getAllUser);

router.get('/:id',UserControllers.getSingleUser);

router.patch('/update-profile/:id',validationRequest(userValidation.updateUserProfileValidationSchema),UserControllers.updateUserProfile);

router.patch('/change-password/:id',validationRequest(userValidation.changePasswordValidationSchema),UserControllers.changePassword);

router.delete('/:id',UserControllers.deleteUser);

export const userRoutes = router