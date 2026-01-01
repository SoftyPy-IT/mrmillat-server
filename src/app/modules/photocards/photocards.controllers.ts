import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { PhotoCardsServices } from './photocards.services';

const createPhotoCards = catchAsync(async (req, res) => {
  const PhotoCards = req.body;
  const result = await PhotoCardsServices.createPhotoCardsIntoDB(PhotoCards);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'PhotoCards created successfully',
    data: result,
  });
});

const getAllPhotoCards = catchAsync(async (req, res) => {
  const result = await PhotoCardsServices.getAllPhotoCardsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All PhotoCards retrieve successfully',
    data: result,
  });
});

const getSinglePhotoCards = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PhotoCardsServices.getSinglePhotoCardsFromDB(id);
  if (!result) {
    throw new Error('PhotoCards not found');
  }
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single PhotoCards retrieve successfully',
    data: result,
  });
});

const updatePhotoCards = catchAsync(async (req, res) => {
  const { id } = req.params;
  const PhotoCards = req.body;
  const result = await PhotoCardsServices.updatePhotoCardsFromDB(id, PhotoCards);
  if (!result) {
    throw new Error('PhotoCards not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update PhotoCards successfully',
    data: result,
  });
});

const deletePhotoCards = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PhotoCardsServices.deletePhotoCardsFromDB(id);
  if (!result) {
    throw new Error('PhotoCards not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'PhotoCards deleted successfully',
    data: result,
  });
});

export const PhotoCardsControllers = {
  createPhotoCards,
  getAllPhotoCards,
  getSinglePhotoCards,
  updatePhotoCards,
  deletePhotoCards,
};
