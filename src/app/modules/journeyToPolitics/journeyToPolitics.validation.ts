import { z } from 'zod';

const createJourneyToPoliticsValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }),
    shortDescription: z.string({ invalid_type_error: 'title must be string' }),
  }),
});
const updateJourneyToPoliticsValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: 'title must be string' }).optional(),
    shortDescription: z
      .string({ invalid_type_error: 'title must be string' })
      .optional(),
  }),
});

export const JourneyToPoliticsValidation = {
  createJourneyToPoliticsValidationSchema,
  updateJourneyToPoliticsValidationSchema,
};
