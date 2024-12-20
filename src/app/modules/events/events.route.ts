import express from 'express';
import { EventControllers } from './events.controller';
import { eventValidation } from './events.validation';
import validationRequest from '../../middlewares/validationRequest';
const router = express.Router();


router.post('/create-event',validationRequest(eventValidation.createEventValidationSchema), EventControllers.createEvent);
router.get('/', EventControllers.getAllEvents);
router.get('/:id', EventControllers.getSingleEvent);
router.patch('/:id',validationRequest(eventValidation.updateEventValidationSchema), EventControllers.updateEvent);
router.delete('/:id', EventControllers.deleteEvent);


export const eventRoutes = router