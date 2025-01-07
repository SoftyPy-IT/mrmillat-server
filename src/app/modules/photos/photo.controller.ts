import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { PhotoServices } from './photo.service';

const createPhoto = catchAsync(async (req, res) => {
  const payload = req.body;
  const file = req.file;
  const result = await PhotoServices.createPhotoIntoDB(payload, file);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Photo created successfully',
    data: result,
  });
});

const getAllPhotos = catchAsync(async (req, res) => {
  const result = await PhotoServices.getAllPhotoFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Photo retrieve successfully',
    data: result,
  });
});

const getSinglePhoto = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PhotoServices.getSinglePhotoFromDB(id);
  if (!result) {
    throw new Error('Photo not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Photo retrieve successfully',
    data: result,
  });
});

const deletePhoto = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PhotoServices.deletePhotoFromDB(id);
  if (!result) {
    throw new Error('Photo not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Photo deleted successfully',
    data: result,
  });
});

export const PhotoControllers = {
  createPhoto,
  getAllPhotos,
  getSinglePhoto,
  deletePhoto,
};
