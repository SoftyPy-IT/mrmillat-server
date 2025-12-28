// server/videos/video.controller.ts
import { Request, Response } from 'express';
import { VideoServices } from './video.service';
import catchAsync from '../../utils/catchAsync';

const createVideo = catchAsync(async (req, res) => {
  
  const result = await VideoServices.createVideoIntoDB(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Video created successfully',
    data: result,
  });
});

const getAllVideos = catchAsync(async (req: Request, res: Response) => {
  const result = await VideoServices.getAllVideosFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Videos retrieved successfully',
    data: result,
  });
});

const getSingleVideo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VideoServices.getSingleVideoFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Video retrieved successfully',
    data: result,
  });
});

const updateVideo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VideoServices.updateVideoFromDB(id, req.body);
  res.status(200).json({
    success: true,
    message: 'Video updated successfully',
    data: result,
  });
});

const deleteVideo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await VideoServices.deleteVideoFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Video deleted successfully',
  });
});

export const VideoControllers = {
  createVideo,
  getAllVideos,
  getSingleVideo,
  updateVideo,
  deleteVideo,
};