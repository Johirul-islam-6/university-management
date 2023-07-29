'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require('zod');
const academic_constant_1 = require('./academic.constant');
// zod validation error setup
const AcademicSemesterZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.enum([...academic_constant_1.AcademicSemesterTitele], {
      required_error: 'Titele is Required ',
    }),
    year: zod_1.z.string({
      required_error: 'Year is Required',
    }),
    code: zod_1.z.enum(['01', '02', '03'], {
      required_error: 'Code is Required',
    }),
    startMonth: zod_1.z.enum([...academic_constant_1.AcademicSemesterMonth], {
      required_error: 'start month is Required',
    }),
    endMonth: zod_1.z.enum([...academic_constant_1.AcademicSemesterMonth], {
      required_error: 'End Month is required',
    }),
  }),
});
// update validation
const UpdateAcademicSemesterSchema = zod_1.z
  .object({
    body: zod_1.z.object({
      title: zod_1.z
        .enum([...academic_constant_1.AcademicSemesterTitele], {
          required_error: 'Titele is Required ',
        })
        .optional(),
      year: zod_1.z
        .string({
          required_error: 'Year is Required',
        })
        .optional(),
      code: zod_1.z
        .enum(['01', '02', '03'], {
          required_error: 'Code is Required',
        })
        .optional(),
      startMonth: zod_1.z
        .enum([...academic_constant_1.AcademicSemesterMonth], {
          required_error: 'start month is Required',
        })
        .optional(),
      endMonth: zod_1.z
        .enum([...academic_constant_1.AcademicSemesterMonth], {
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
exports.AcademicSemesterValidation = {
  AcademicSemesterZodSchema,
  UpdateAcademicSemesterSchema,
};
