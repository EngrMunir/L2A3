import { z } from 'zod';

const createUserNameValidationSchema = z.object({
    firstName: z
      .string()
      .min(1)
      .max(20)
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
      }),
    middleName: z.string(),
    lastName: z.string(),
  });

export const createUserValidationSchema = z.object({
    body: z.object({
        name: createUserNameValidationSchema,
        email: z.string().email(),
        password: z.string(),
        role: z.enum(['admin','password']),
    }),
  });