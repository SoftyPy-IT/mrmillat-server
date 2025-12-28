import express from 'express';
import { PlanControllers } from './plan.controller';
import { PlanValidation } from './plan.validation';
import validationRequest from '../../middlewares/validationRequest';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-plan',
  auth('admin', 'editor'),
  validationRequest(PlanValidation.createPlanValidationSchema),
  PlanControllers.createPlan,
);
router.get('/', PlanControllers.getAllPlans);
router.get('/upcoming', PlanControllers.getUpcomingPlans);
router.get('/:id', PlanControllers.getSinglePlan);
router.patch(
  '/:id',
  auth('admin', 'editor'),
  validationRequest(PlanValidation.updatePlanValidationSchema),
  PlanControllers.updatePlan,
);
router.delete('/:id', auth('admin', 'editor'), PlanControllers.deletePlan);

export const PlanRoutes = router;
