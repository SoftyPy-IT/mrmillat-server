import { z } from 'zod';

const updateBiographyValidationSchema = z.object({
  body: z.object({
    imageUrl: z
      .string({ invalid_type_error: 'imageUrl must be a string' })
      .optional(),
    title: z
      .string({ invalid_type_error: 'title must be a string' })
      .optional(),
    shortDescription: z
      .string({ invalid_type_error: 'shortDescription must be a string' })
      .optional(),
    items: z
      .array(
        z.object({
          _id: z.string().optional(),
          action: z.enum(['add', 'update', 'delete']).optional(),
          itemTitle: z
            .string({ invalid_type_error: 'itemTitle must be a string' })
            .optional(),
          itemDescription: z
            .string({ invalid_type_error: 'itemDescription must be a string' })
            .optional(),
        }),
      )
      .optional(),
  }),
});

export const BiographyValidation = {
  updateBiographyValidationSchema,
};
