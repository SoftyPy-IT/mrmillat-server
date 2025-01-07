import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { BiographyServices } from './biography.service';

const getAllBiography = catchAsync(async (req, res) => {
  const result = await BiographyServices.getAllBiographyFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Biography retrieve successfully',
    data: result,
  });
});

const updateBiography = catchAsync(async (req, res) => {
  const { id } = req.params;
  const Biography = req.body;
  const result = await BiographyServices.updateBiographyFromDB(id, Biography);
  if (!result) {
    throw new Error('Hero Section not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Biography successfully',
    data: result,
  });
});

export const BiographyControllers = {
  getAllBiography,
  updateBiography,
};
