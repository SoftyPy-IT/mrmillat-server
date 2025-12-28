// server/videos/video.routes.ts
import express from 'express';
import { VideoControllers } from './video.controller';
import { VideoValidation } from './video.validation';
import validateRequest from '../../middlewares/validationRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(VideoValidation.createVideoValidationSchema),
  VideoControllers.createVideo
);

router.get('/', VideoControllers.getAllVideos);
router.get('/:id', VideoControllers.getSingleVideo);
router.put(
  '/:id',
  validateRequest(VideoValidation.updateVideoValidationSchema),
  VideoControllers.updateVideo
);
router.delete('/:id', VideoControllers.deleteVideo);

export const videoRoutes = router;