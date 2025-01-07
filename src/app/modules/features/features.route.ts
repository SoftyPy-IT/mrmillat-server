import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { FeaturesControllers } from './features.controller';
import { featuresValidation } from './features.validation';
import auth from '../../middlewares/auth';

const router = express.Router();
router.get('/', FeaturesControllers.getAllFeatures);
router.patch(
  '/:id',
  auth('admin', 'editor'),
  validationRequest(featuresValidation.FeaturesUpdateValidationSchema),
  FeaturesControllers.updateFeatures,
);

export const featureRoutes = router;
