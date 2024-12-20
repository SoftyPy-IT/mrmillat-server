import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { JourneyToPoliticsValidation } from './journeyToPolitics.validation';
import { JourneyToPoliticsControllers } from './journeyToPolitics.contoller';

const router = express.Router();

router.post('/create-journey-to-politics',validationRequest(JourneyToPoliticsValidation.createJourneyToPoliticsValidationSchema),JourneyToPoliticsControllers.createJourneyToPolitics);
router.get('/', JourneyToPoliticsControllers.getAllJourneyToPolitics);
router.get('/:id',JourneyToPoliticsControllers.getSingleJourneyToPolitics);
router.patch('/:id',validationRequest(JourneyToPoliticsValidation.updateJourneyToPoliticsValidationSchema),JourneyToPoliticsControllers.updateJourneyToPolitics);
router.delete('/:id',JourneyToPoliticsControllers.deleteJourneyToPolitics);


export const journeyToPoliticsRoutes = router