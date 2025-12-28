// server/videos/video.validation.ts
import { z } from 'zod';

const createVideoValidationSchema = z.object({
  body: z.object({
    folder: z.string({ required_error: 'Folder is required' }),
    title: z.string().optional(),
    videoType: z.enum(['youtube', 'facebook']).default('youtube'),
    videoUrl: z.string({ required_error: 'Video URL is required' }),
  }),
});

const updateVideoValidationSchema = createVideoValidationSchema.partial();

export const VideoValidation = {
  createVideoValidationSchema,
  updateVideoValidationSchema,
};