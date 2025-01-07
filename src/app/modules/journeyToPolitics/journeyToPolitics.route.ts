import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { JourneyToPoliticsValidation } from './journeyToPolitics.validation';
import { JourneyToPoliticsControllers } from './journeyToPolitics.contoller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-journey-to-politics',
  auth('admin', 'editor'),
  validationRequest(
    JourneyToPoliticsValidation.createJourneyToPoliticsValidationSchema,
  ),
  JourneyToPoliticsControllers.createJourneyToPolitics,
);
router.get('/', JourneyToPoliticsControllers.getAllJourneyToPolitics);
router.get('/:id', JourneyToPoliticsControllers.getSingleJourneyToPolitics);
router.patch(
  '/:id',
  auth('admin', 'editor'),
  validationRequest(
    JourneyToPoliticsValidation.updateJourneyToPoliticsValidationSchema,
  ),
  JourneyToPoliticsControllers.updateJourneyToPolitics,
);
router.delete(
  '/:id',
  auth('admin', 'editor'),
  JourneyToPoliticsControllers.deleteJourneyToPolitics,
);

export const journeyToPoliticsRoutes = router;
