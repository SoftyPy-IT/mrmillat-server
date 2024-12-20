import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { HeroSectionControllers } from './heroSection.controller';
import { heroSectionValidation } from './heroSection.validation';

const router = express.Router();
router.get('/', HeroSectionControllers.getAllHeroSection);
router.get('/:id', HeroSectionControllers.getSingleHeroSection);
router.patch('/:id',validationRequest(heroSectionValidation.HeroSectionUpdateValidationSchema),HeroSectionControllers.updateHeroSection);

export const heroSectionRoutes = router