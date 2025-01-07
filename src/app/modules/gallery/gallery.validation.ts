import { z } from 'zod';

const createGalleryValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }),
    date: z.string({ invalid_type_error: 'date must be string' }),
    imageUrl: z.string({ invalid_type_error: 'videoUrl must be string' }),
  }),
});

const updateGalleryValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }).optional(),
    date: z.string({ invalid_type_error: 'date must be string' }).optional(),
    imageUrl: z
      .string({ invalid_type_error: 'video url must be string' })
      .optional(),
  }),
});

export const galleryValidation = {
  createGalleryValidationSchema,
  updateGalleryValidationSchema,
};
