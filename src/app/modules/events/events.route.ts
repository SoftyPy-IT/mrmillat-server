import express from 'express';
import { EventControllers } from './events.controller';
import { eventValidation } from './events.validation';
import validationRequest from '../../middlewares/validationRequest';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-event',
  auth('admin', 'editor'),
  validationRequest(eventValidation.createEventValidationSchema),
  EventControllers.createEvent,
);
router.get('/', EventControllers.getAllEvents);
router.get('/upcoming', EventControllers.getUpcomingEvents);
router.get('/:id', EventControllers.getSingleEvent);
router.patch(
  '/:id',
  auth('admin', 'editor'),
  validationRequest(eventValidation.updateEventValidationSchema),
  EventControllers.updateEvent,
);
router.delete('/:id', auth('admin', 'editor'), EventControllers.deleteEvent);

export const eventRoutes = router;
