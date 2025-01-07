/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builders/QueryBuilder';
import { sendVideoToCloudinary } from '../../utils/sendImageToCloudinary';
import { TVideo } from './video.interface';
import { Video } from './video.model';

const createVideoIntoDB = async (payload: TVideo, file: any) => {
  const name = `${payload?.folder}-${Date.now()}`;
  const path = file?.path;

  const { secure_url } = await sendVideoToCloudinary(name, path);
  payload.videoUrl = secure_url;
  const result = await Video.create(payload);
  return result;
};

const getAllVideosFromDB = async (query: Record<string, unknown>) => {
  const { folder } = query;
  const VideoQuery = new QueryBuilder(Video.find(), query).filter().paginate();
  const data = await VideoQuery.modelQuery;
  const totalCount = await Video.countDocuments(folder ? { folder } : {});
  const result = { data, totalCount };
  return result;
};

const getSingleVideoFromDB = async (id: string) => {
  const result = await Video.findById(id);
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
  deleteVideoFromDB,
};
