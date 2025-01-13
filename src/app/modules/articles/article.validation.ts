import { z } from 'zod';

const createArticleValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }),
    shortDescription: z.string({ invalid_type_error: 'shortDescription must be string' }),
    description: z.string({ invalid_type_error: 'description must be string' }),
    publishedDate: z.string({ invalid_type_error: 'date must be string' }),
    imageUrl: z.string({ invalid_type_error: 'imageUrl must be string' }),
  }),
});

const updateArticleValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }).optional(),
    shortDescription: z
      .string({ invalid_type_error: 'shortDescription must be string' })
      .optional(),
    description: z
      .string({ invalid_type_error: 'description must be string' })
      .optional(),
    publishedDate: z
      .string({ invalid_type_error: 'date must be string' })
      .optional(),
    imageUrl: z
      .string({ invalid_type_error: 'imageUrl must be string' })
      .optional(),
  }),
});

export const articleValidation = {
  createArticleValidationSchema,
  updateArticleValidationSchema,
};
