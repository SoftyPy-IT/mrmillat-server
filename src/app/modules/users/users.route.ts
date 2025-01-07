import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { userValidation } from './users.validation';
import { UserControllers } from './users.controllers';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-user',
  auth('admin'),
  validationRequest(userValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.get('/', auth('admin'), UserControllers.getAllUser);

router.get('/:id', auth('admin', 'editor'), UserControllers.getSingleUser);

router.patch(
  '/update-profile/:id',
  auth('admin', 'editor'),
  validationRequest(userValidation.updateUserProfileValidationSchema),
  UserControllers.updateUserProfile,
);

router.delete('/:id', auth('admin'), UserControllers.deleteUser);

export const userRoutes = router;
