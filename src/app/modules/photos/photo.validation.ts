import { z } from 'zod';

const createPhotoValidationSchema = z.object({
  body: z.object({
    folder: z.string({ required_error: 'folder is require' }),
  }),
});

export const photoValidation = {
  createPhotoValidationSchema,
};
