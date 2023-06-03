import { Request, Response } from 'express'
import { createdUser } from './users.service'

const singelUserCreated = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await createdUser(user)

    res.status(200).json({
      success: true,
      data: result,
      massage: 'user created successfully',
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: 'fail to create user',
    })
  }
}

export default {
  singelUserCreated,
}
