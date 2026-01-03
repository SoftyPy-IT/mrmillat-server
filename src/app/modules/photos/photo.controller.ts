import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { PhotoServices } from './photo.service';

const createPhoto = catchAsync(async (req, res) => {
  const payload = req.body;
  const files = req.files as Express.Multer.File[]; // Changed from req.file to req.files
  
  // Process multiple files
  const results = await Promise.all(
    files.map(async (file) => {
      const result = await PhotoServices.createPhotoIntoDB(payload, file);
      return result;
    })
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${results.length} photo(s) created successfully`,
    data: results,
  });
});

const getAllPhotos = catchAsync(async (req, res) => {
  const result = await PhotoServices.getAllPhotoFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Photos retrieved successfully',
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
    message: 'Single Photo retrieved successfully',
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