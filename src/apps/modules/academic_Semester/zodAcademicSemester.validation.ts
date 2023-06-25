import { z } from 'zod';
import {
  AcademicSemesterMonth,
  AcademicSemesterTitele,
} from './academic.constant';

// zod validation error setup
const AcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitele] as [string, ...string[]], {
      required_error: 'Titele is Required ',
    }),

    year: z.string({
      required_error: 'Year is Required',
    }),

    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is Required',
    }),

    startMonth: z.enum([...AcademicSemesterMonth] as [string, ...string[]], {
      required_error: 'start month is Required',
    }),
    endMonth: z.enum([...AcademicSemesterMonth] as [string, ...string[]], {
      required_error: 'End Month is required',
    }),
  }),
});

// update validation

const UpdateAcademicSemesterSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterTitele] as [string, ...string[]], {
          required_error: 'Titele is Required ',
        })
        .optional(),

      year: z
        .string({
          required_error: 'Year is Required',
        })
        .optional(),

      code: z
        .enum(['01', '02', '03'], {
          required_error: 'Code is Required',
        })
        .optional(),

      startMonth: z
        .enum([...AcademicSemesterMonth] as [string, ...string[]], {
          required_error: 'start month is Required',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicSemesterMonth] as [string, ...string[]], {
          required_error: 'End Month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    { message: `either both title and code should be provided neither` }
  );

// await createUserZodSchema.parseAsync(req)

export const AcademicSemesterValidation = {
  AcademicSemesterZodSchema,
  UpdateAcademicSemesterSchema,
};
