import { z } from 'zod';

// zod validation error setup
const AcademicSemesterZodSchema = z.object({
  body: z.object({
    titele: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Titele is Required ',
    }),

    year: z.number({
      required_error: 'Year is Required',
    }),

    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is Required',
    }),

    startMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'Code is Required',
      }
    ),
    endMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'EndMonth is required',
      }
    ),
  }),
});

// await createUserZodSchema.parseAsync(req)

export const AcademicSemesterValidation = {
  AcademicSemesterZodSchema,
};
