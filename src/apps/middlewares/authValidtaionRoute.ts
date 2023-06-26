import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';

export const atuthValidationRoute =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized',
          ''
        );
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifiedToken(
        token,
        config.JWT.secret as Secret
      ) as JwtPayload;

      req.user = verifiedUser; // role , userid

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden', '');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
