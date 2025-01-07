import express, { NextFunction, Request, Response } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { videoValidation } from './video.validation';
import { VideoControllers } from './video.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();
router.post(
  '/create-video',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(videoValidation.createVideoValidationSchema),
  VideoControllers.createVideo,
);

router.get('/', VideoControllers.getAllVideos);
router.get('/:id', VideoControllers.getSingleVideo);
router.delete('/:id', VideoControllers.deleteVideo);

export const videoRoutes = router;
