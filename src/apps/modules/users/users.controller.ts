import { RequestHandler } from 'express'
import { UserServices } from './users.service'
import { z } from 'zod'

const singelUserCreated: RequestHandler = async (req, res, next) => {
  try {
    // zod validation error setup
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
        password: z.string().optional(),
      }),
    })

    await createUserZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await UserServices.createdUser(user)

    res.status(200).json({
      success: true,
      data: result,
      massage: 'user created successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const CreateUserController = {
  singelUserCreated,
}
