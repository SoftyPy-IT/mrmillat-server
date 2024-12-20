import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { galleryValidation } from './gallery.validation';
import { GalleryControllers } from './gallery.controllers';
const router = express.Router();

router.post('/create-gallery',validationRequest(galleryValidation.createGalleryValidationSchema), GalleryControllers.createGallery);
router.get('/', GalleryControllers.getAllGallery);
router.get('/:id',GalleryControllers.getSingleGallery);
router.patch('/:id',validationRequest(galleryValidation.updateGalleryValidationSchema),GalleryControllers.updateGallery);
router.delete('/:id',GalleryControllers.deleteGallery);

export const galleryRoutes = router