import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { photoCardsValidation } from './photocards.validation';
import { PhotoCardsControllers } from './photocards.controllers';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-photoCards',
  auth('admin', 'editor'),
  validationRequest(photoCardsValidation.createPhotoCardsValidationSchema),
  PhotoCardsControllers.createPhotoCards,
);
router.get('/', PhotoCardsControllers.getAllPhotoCards);
router.get('/:id', PhotoCardsControllers.getSinglePhotoCards);
router.patch(
  '/:id',
  auth('admin', 'editor'),
  validationRequest(photoCardsValidation.updatePhotoCardsValidationSchema),
  PhotoCardsControllers.updatePhotoCards,
);
router.delete(
  '/:id',
  auth('admin', 'editor'),
  PhotoCardsControllers.deletePhotoCards,
);

export const photoCardsRoutes = router;
