import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { VoiceOnMediaServices } from './voiceOnMedia.services';

const createVoiceOnMedia = catchAsync(async (req, res) => {
  const voiceOnMedia = req.body;
  const result =
    await VoiceOnMediaServices.createVoiceOnMediaIntoDB(voiceOnMedia);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'VoiceOnMedia created successfully',
    data: result,
  });
});

const getAllVoiceOnMedias = catchAsync(async (req, res) => {
  const result = await VoiceOnMediaServices.getAllVoiceOnMediaFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All VoiceOnMedia retrieve successfully',
    data: result,
  });
});

const getSingleVoiceOnMedia = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VoiceOnMediaServices.getSingleVoiceOnMediaFromDB(id);
  if (!result) {
    throw new Error('VoiceOnMedia not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single VoiceOnMedia retrieve successfully',
    data: result,
  });
});

const updateVoiceOnMedia = catchAsync(async (req, res) => {
  const { id } = req.params;
  const voiceOnMedia = req.body;
  const result = await VoiceOnMediaServices.updateVoiceOnMediaFromDB(
    id,
    voiceOnMedia,
  );
  if (!result) {
    throw new Error('VoiceOnMedia not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update VoiceOnMedia successfully',
    data: result,
  });
});

const deleteVoiceOnMedia = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VoiceOnMediaServices.deleteVoiceOnMediaFromDB(id);
  if (!result) {
    throw new Error('VoiceOnMedia not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'VoiceOnMedia deleted successfully',
    data: result,
  });
});

export const VoiceOnMediaControllers = {
  createVoiceOnMedia,
  getAllVoiceOnMedias,
  getSingleVoiceOnMedia,
  updateVoiceOnMedia,
  deleteVoiceOnMedia,
};
