import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    imageUrl: z.string().optional(),
    status: z
      .enum(['in-progress', 'blocked'])
      .optional()
      .default('in-progress'),
    role: z.enum(['admin', 'editor']).optional().default('editor'),
  }),
});

const updateUserProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    imageUrl: z.string().optional(),
    status: z
      .enum(['in-progress', 'blocked'])
      .optional()
      .default('in-progress'),
    role: z.enum(['admin', 'editor']).optional().default('editor'),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserProfileValidationSchema,
};
