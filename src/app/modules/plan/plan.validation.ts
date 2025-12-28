import { z } from 'zod';

const createPlanValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }),
    shortDescription: z.string({ invalid_type_error: 'shortDescription must be string' }),
    description: z.string({ invalid_type_error: 'description must be string' }),
    location: z.string({ invalid_type_error: 'location must be string' }),
    date: z.string({ invalid_type_error: 'date must be string' }),
    imageUrl: z.string({ invalid_type_error: 'imageUrl must be string' }),
  }),
});

const updatePlanValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }).optional(),
    shortDescription: z
      .string({ invalid_type_error: 'shortDescription must be string' })
      .optional(),
    description: z
      .string({ invalid_type_error: 'description must be string' })
      .optional(),
    location: z
      .string({ invalid_type_error: 'location must be string' })
      .optional(),
    date: z.string({ invalid_type_error: 'date must be string' }).optional(),
    imageUrl: z
      .string({ invalid_type_error: 'imageUrl must be string' })
      .optional(),
  }),
});

export const PlanValidation = {
  createPlanValidationSchema,
  updatePlanValidationSchema,
};
