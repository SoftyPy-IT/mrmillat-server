import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { voiceOnMediaValidation } from './voiceOnMedia.validation';
import { VoiceOnMediaControllers } from './voiceOnMedia.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'editor'),
  validationRequest(voiceOnMediaValidation.createVoiceOnMediaValidationSchema),
  VoiceOnMediaControllers.createVoiceOnMedia,
);
router.get('/', VoiceOnMediaControllers.getAllVoiceOnMedias);
router.get('/:id', VoiceOnMediaControllers.getSingleVoiceOnMedia);
router.patch(
  '/:id',
  auth('admin', 'editor'),
  validationRequest(voiceOnMediaValidation.updateVoiceOnMediaValidationSchema),
  VoiceOnMediaControllers.updateVoiceOnMedia,
);
router.delete(
  '/:id',
  auth('admin', 'editor'),
  VoiceOnMediaControllers.deleteVoiceOnMedia,
);

export const voiceOnMediaRoutes = router;
