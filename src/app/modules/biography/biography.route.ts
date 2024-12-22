import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { BiographyControllers } from './biography.controller';
import { BiographyValidation } from './biography.validation';
import auth from '../../middlewares/auth';

const router = express.Router();
router.get('/',BiographyControllers.getAllBiography);
router.patch('/:id',auth('admin','editor'),validationRequest(BiographyValidation.updateBiographyValidationSchema),BiographyControllers.updateBiography);

export const biographyRoutes = router