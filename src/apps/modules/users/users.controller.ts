import { RequestHandler } from 'express';
import { UserServices } from './users.service';

const singelUserCreated: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UserServices.createdUser(user);

    res.status(200).json({
      success: true,
      data: result,
      massage: 'user created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const CreateUserController = {
  singelUserCreated,
};
