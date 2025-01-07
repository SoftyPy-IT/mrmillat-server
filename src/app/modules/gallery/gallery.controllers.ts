import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { GalleryServices } from './gallery.services';

const createGallery = catchAsync(async (req, res) => {
  const Gallery = req.body;
  const result = await GalleryServices.createGalleryIntoDB(Gallery);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Gallery created successfully',
    data: result,
  });
});

const getAllGallery = catchAsync(async (req, res) => {
  const result = await GalleryServices.getAllGalleryFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Gallery retrieve successfully',
    data: result,
  });
});

const getSingleGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GalleryServices.getSingleGalleryFromDB(id);
  if (!result) {
    throw new Error('Gallery not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Gallery retrieve successfully',
    data: result,
  });
});

const updateGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const Gallery = req.body;
  const result = await GalleryServices.updateGalleryFromDB(id, Gallery);
  if (!result) {
    throw new Error('Gallery not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Gallery successfully',
    data: result,
  });
});

const deleteGallery = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GalleryServices.deleteGalleryFromDB(id);
  if (!result) {
    throw new Error('Gallery not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Gallery deleted successfully',
    data: result,
  });
});

export const GalleryControllers = {
  createGallery,
  getAllGallery,
  getSingleGallery,
  updateGallery,
  deleteGallery,
};
