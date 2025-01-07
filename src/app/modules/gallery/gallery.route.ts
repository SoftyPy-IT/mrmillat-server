import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { galleryValidation } from './gallery.validation';
import { GalleryControllers } from './gallery.controllers';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-gallery',
  auth('admin', 'editor'),
  validationRequest(galleryValidation.createGalleryValidationSchema),
  GalleryControllers.createGallery,
);
router.get('/', GalleryControllers.getAllGallery);
router.get('/:id', GalleryControllers.getSingleGallery);
router.patch(
  '/:id',
  auth('admin', 'editor'),
  validationRequest(galleryValidation.updateGalleryValidationSchema),
  GalleryControllers.updateGallery,
);
router.delete(
  '/:id',
  auth('admin', 'editor'),
  GalleryControllers.deleteGallery,
);

export const galleryRoutes = router;
