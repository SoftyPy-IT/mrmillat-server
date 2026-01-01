import { z } from 'zod';

const createPhotoCardsValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }),
    date: z.string({ invalid_type_error: 'date must be string' }),
    imageUrl: z.string({ invalid_type_error: 'Photo Cards URL must be string' }),
  }),
});

const updatePhotoCardsValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }).optional(),
    date: z.string({ invalid_type_error: 'date must be string' }).optional(),
    imageUrl: z
      .string({ invalid_type_error: 'Photo Cards url must be string' })
      .optional(),
  }),
});

export const photoCardsValidation = {
  createPhotoCardsValidationSchema,
  updatePhotoCardsValidationSchema,
};
