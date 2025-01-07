import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/users/users.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/users/users.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    // const token = req.headers.authorization

    if (!token) {
      throw new Error('You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.access_token_secret as string,
    ) as JwtPayload;

    const { role, email, iat } = decoded;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User is not Exist');
    }

    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw Error('user is blocked!');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChange(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new Error('You are not authorized!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized!');
    }
    // as JwtPayload;
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
