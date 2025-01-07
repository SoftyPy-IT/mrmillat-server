import { z } from 'zod';

const HeroSectionUpdateValidationSchema = z.object({
  body: z.object({
    category: z
      .string({
        invalid_type_error: 'Category must be a string',
      })
      .optional(),
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
      })
      .optional(),
    subTitle: z
      .string({
        invalid_type_error: 'Subtitle must be a string',
      })
      .optional(),
    bgImageForLg: z
      .string({
        invalid_type_error: 'Background Image URL must be a valid string',
      })
      .optional(),
    bgImageForSm: z
      .string({
        invalid_type_error: 'Background Image URL must be a valid string',
      })
      .optional(),
  }),
});

export const heroSectionValidation = {
  HeroSectionUpdateValidationSchema,
};
