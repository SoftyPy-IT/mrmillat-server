import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.services';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true, // Keep the refresh token HttpOnly (can't be accessed in JS)
  });

  res.cookie('accessToken', accessToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: false, // Allows client-side JavaScript to read it
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' User login successfully',
    data: {
      accessToken,
      user,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const userData = req.user;
  if (!userData) {
    throw new Error('User data is missing');
  }
  const passwordData = req.body;
  const result = await authServices.changePasswordIntoDB(
    userData,
    passwordData,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password is changed successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  // const {refreshToken} = req.cookies;
  const refreshToken = req.cookies.refreshToken; // Check cookie retrieval
  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }
  const result = await authServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'access token is retrieve successfully',
    data: result,
  });
});

export const authControllers = {
  loginUser,
  refreshToken,
  changePassword,
};
