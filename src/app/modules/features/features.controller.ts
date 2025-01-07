import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { FeaturesServices } from './features.services';

const getAllFeatures = catchAsync(async (req, res) => {
  const result = await FeaturesServices.getAllFeaturesFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Features retrieve successfully',
    data: result,
  });
});

const updateFeatures = catchAsync(async (req, res) => {
  const { id } = req.params;
  const features = req.body;
  const result = await FeaturesServices.updateFeaturesFromDB(id, features);
  if (!result) {
    throw new Error('Features not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Features successfully',
    data: result,
  });
});

export const FeaturesControllers = {
  getAllFeatures,
  updateFeatures,
};
