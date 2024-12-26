/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendVideoToCloudinary } from "../../utils/sendImageToCloudinary";
import { TVideo } from "./video.interface";
import { Video } from "./video.model";

const createVideoIntoDB = async (payload: TVideo, file: any) => {
  const name = `${payload?.folder}-${Date.now()}`;
  const path = file?.path;

  const { secure_url } = await sendVideoToCloudinary(name, path);
  payload.videoUrl = secure_url;
  const result = await Video.create(payload);
  return result;
};

const getAllVideosFromDB = async (query: Record<string, unknown>) => {
  const result = await Video.find(query);
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
