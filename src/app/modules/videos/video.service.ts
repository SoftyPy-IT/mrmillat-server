/* eslint-disable @typescript-eslint/no-explicit-any */
// server/videos/video.service.ts
import { TVideo } from './video.model';
import { Video } from './video.model';

const createVideoIntoDB = async (payload: TVideo) => {
  const result = await Video.create(payload);
  return result;
};

const getAllVideosFromDB = async (query: Record<string, unknown>) => {
  const { page = 1, limit = 10, folder, videoType } = query;
  const filter: any = {};
  
  if (folder) filter.folder = folder;
  if (videoType) filter.videoType = videoType;
  
  const skip = (Number(page) - 1) * Number(limit);
  
  const data = await Video.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });
  
  const totalCount = await Video.countDocuments(filter);
  
  return { data, totalCount };
};

const getSingleVideoFromDB = async (id: string) => {
  const result = await Video.findById(id);
  return result;
};

const updateVideoFromDB = async (id: string, payload: Partial<TVideo>) => {
  const result = await Video.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteVideoFromDB = async (id: string) => {
  const result = await Video.findByIdAndDelete(id);
  return result;
};

export const VideoServices = {
  createVideoIntoDB,
  getAllVideosFromDB,
  getSingleVideoFromDB,
  updateVideoFromDB,
  deleteVideoFromDB,
};