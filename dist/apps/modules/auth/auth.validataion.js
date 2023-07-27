"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const authZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: 'ID is Required !',
        })
            .optional(),
        password: zod_1.z
            .string({
            required_error: 'Password is Required',
        })
            .optional(),
    }),
});
const refreshtokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z
            .string({
            required_error: 'Refresh Token is Requierd',
        })
            .optional(),
        // password: z
        //   .string({
        //     required_error: 'Password is Required',
        //   })
        //   .optional(),
    }),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z
            .string({
            required_error: 'Old Password is Required',
        })
            .optional(),
        newPassword: zod_1.z
            .string({
            required_error: 'write New Password is Required',
        })
            .optional(),
    }),
});
exports.AuthValidation = {
    authZodSchema,
    refreshtokenZodSchema,
    changePasswordZodSchema,
};
