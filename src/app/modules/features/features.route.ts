import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { FeaturesControllers } from './features.controller';
import { featuresValidation } from './features.validation';

const router = express.Router();
router.get('/', FeaturesControllers.getAllFeatures);
router.patch('/:id',validationRequest(featuresValidation.FeaturesUpdateValidationSchema),FeaturesControllers.updateFeatures);

export const featureRoutes = router