import { z } from 'zod';

const authZodSchema = z.object({
  body: z.object({
    id: z
      .string({
        required_error: 'ID is Required !',
      })
      .optional(),
    password: z
      .string({
        required_error: 'Password is Required',
      })
      .optional(),
  }),
});
const refreshtokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z
      .string({
        required_error: 'Refresh Token is Requierd',
      })
      .optional(),
    password: z
      .string({
        required_error: 'Password is Required',
      })
      .optional(),
  }),
});

export const AuthValidation = {
  authZodSchema,
  refreshtokenZodSchema,
};
