/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builders/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TPhoto } from './photo.interface';
import { Photo } from './photo.model';

const createPhotoIntoDB = async (payload: TPhoto, file: any) => {
  const name = `${payload?.folder}-${Date.now()}`;
  const path = file?.path;

  const { secure_url } = await sendImageToCloudinary(name, path);
  payload.imageUrl = secure_url;
  const result = await Photo.create(payload);
  return result;
};

const getAllPhotoFromDB = async (query: Record<string, unknown>) => {
  const { folder } = query;
  const PhotoQuery = new QueryBuilder(Photo.find(), query).filter().paginate();
  const data = await PhotoQuery.modelQuery;
  const totalCount = await Photo.countDocuments(folder ? { folder } : {});
  const result = { data, totalCount };
  return result;
};

const getSinglePhotoFromDB = async (id: string) => {
  const result = await Photo.findById(id);
  return result;
};

const deletePhotoFromDB = async (id: string) => {
  const result = await Photo.findByIdAndDelete(id);
  return result;
};

export const PhotoServices = {
  createPhotoIntoDB,
  getAllPhotoFromDB,
  getSinglePhotoFromDB,
  deletePhotoFromDB,
};
