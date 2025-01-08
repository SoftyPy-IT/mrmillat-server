import { z } from 'zod';

const createVoiceOnMediaValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }),
    // date: z.string({ invalid_type_error: 'date must be string' }),
    videoUrl: z.string({ invalid_type_error: 'videoUrl must be string' }),
  }),
});

const updateVoiceOnMediaValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }).optional(),
    // date: z.string({ invalid_type_error: 'date must be string' }).optional(),
    videoUrl: z
      .string({ invalid_type_error: 'video url must be string' })
      .optional(),
  }),
});

export const voiceOnMediaValidation = {
  createVoiceOnMediaValidationSchema,
  updateVoiceOnMediaValidationSchema,
};
