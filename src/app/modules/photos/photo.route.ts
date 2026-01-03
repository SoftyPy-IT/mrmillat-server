import express, { NextFunction, Request, Response } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { photoValidation } from './photo.validation';
import { PhotoControllers } from './photo.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

// Changed from upload.single('file') to upload.array('files')
router.post(
  '/create-photo',
  upload.array('files'), // Changed to handle multiple files
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(photoValidation.createPhotoValidationSchema),
  PhotoControllers.createPhoto,
);

router.get('/', PhotoControllers.getAllPhotos);
router.get('/:id', PhotoControllers.getSinglePhoto);
router.delete('/:id', PhotoControllers.deletePhoto);

export const photosRoutes = router;