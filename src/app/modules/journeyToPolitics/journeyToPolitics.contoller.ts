import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { JourneyToPoliticsServices } from './journeyToPolitics.service';

const createJourneyToPolitics = catchAsync(async (req, res) => {
  const JourneyToPolitics = req.body;
  const result =
    await JourneyToPoliticsServices.createJourneyToPoliticsIntoDB(
      JourneyToPolitics,
    );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'JourneyToPolitics created successfully',
    data: result,
  });
});

const getAllJourneyToPolitics = catchAsync(async (req, res) => {
  const result = await JourneyToPoliticsServices.getAllJourneyToPoliticsFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All JourneyToPolitics retrieve successfully',
    data: result,
  });
});

const getSingleJourneyToPolitics = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await JourneyToPoliticsServices.getSingleJourneyToPoliticsFromDB(id);
  if (!result) {
    throw new Error('JourneyToPolitics not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single JourneyToPolitics retrieve successfully',
    data: result,
  });
});

const updateJourneyToPolitics = catchAsync(async (req, res) => {
  const { id } = req.params;
  const JourneyToPolitics = req.body;
  const result = await JourneyToPoliticsServices.updateJourneyToPoliticsFromDB(
    id,
    JourneyToPolitics,
  );
  if (!result) {
    throw new Error('JourneyToPolitics not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update JourneyToPolitics successfully',
    data: result,
  });
});

const deleteJourneyToPolitics = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await JourneyToPoliticsServices.deleteJourneyToPoliticsFromDB(id);
  if (!result) {
    throw new Error('JourneyToPolitics not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'JourneyToPolitics deleted successfully',
    data: result,
  });
});

export const JourneyToPoliticsControllers = {
  createJourneyToPolitics,
  getAllJourneyToPolitics,
  getSingleJourneyToPolitics,
  updateJourneyToPolitics,
  deleteJourneyToPolitics,
};
