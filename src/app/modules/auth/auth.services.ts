import { TLogin } from './auth.interface';
import { User } from '../users/users.model';
import { createToken } from './auth.utils';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new Error('User is not Exist');
  }

  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw Error('user is blocked!');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new Error('Invalid password !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_token_expiresIn as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    config.refresh_token_expiresIn as string,
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.refresh_token_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

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
    User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)
  ) {
    throw new Error('You are not authorized!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_token_expiresIn as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: {
    confirmPassword: string;
    newPassword: string;
    password: string;
  },
) => {
  const isUserExist = await User.findOne({
    email: userData?.email,
  }).select('+password');

  if (!isUserExist) {
    throw new Error('Users does not exist');
  }

  const isBlocked = isUserExist?.status === 'blocked';

  if (isBlocked) {
    throw new Error('User is blocked!');
  }

  if (
    !(await User.isPasswordMatched(
      payload?.password as string,
      isUserExist.password,
    ))
  ) {
    throw new Error('Invalid Password! please try again');
  }

  if (payload?.newPassword === payload?.confirmPassword) {
    const updatedPassword = await bcrypt.hash(
      payload?.newPassword as string,
      Number(config.bcrypt_solt),
    );

    await User.findOneAndUpdate(
      { email: userData?.email, role: userData?.role },
      {
        $set: {
          password: updatedPassword,
          passwordChangedAt: new Date(),
        },
      },
      { new: true },
    );

    return null;
  }

  throw new Error(
    'Your new Password and confirm password does not match! please try again',
  );
};

export const authServices = {
  loginUser,
  refreshToken,
  changePasswordIntoDB,
};
