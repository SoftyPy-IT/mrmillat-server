import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
// import auth from '../../middlewares/auth';
import { photoValidation } from './photo.validation';
import { PhotoControllers } from './photo.controller';

const router = express.Router();
router.post('/create-voice-on-media',validationRequest(photoValidation.createPhotoValidationSchema), PhotoControllers.createPhoto);
router.get('/', PhotoControllers.getAllPhotos);
router.get('/:id',PhotoControllers.getSinglePhoto);
router.delete('/:id',PhotoControllers.deletePhoto);


export const photosRoutes = router ;