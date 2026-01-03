/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TPhoto } from './photo.interface';
import { Photo } from './photo.model';

const createPhotoIntoDB = async (payload: TPhoto, file: Express.Multer.File) => {
  const name = `${payload?.folder}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const path = file?.path;

  const { secure_url } = await sendImageToCloudinary(name, path);
  const photoData = {
    ...payload,
    imageUrl: secure_url
  };
  const result = await Photo.create(photoData);
  return result;
};

// No changes needed in getAllPhotoFromDB, getSinglePhotoFromDB, deletePhotoFromDB

const getAllPhotoFromDB = async (query: Record<string, unknown>) => {
  const { folder, page = 1, limit = 12 } = query;
  
  const filterConditions: any = {};
  if (folder) {
    filterConditions.folder = folder;
  }
  
  const skip = (Number(page) - 1) * Number(limit);
  
  const data = await Photo.find(filterConditions)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(Number(limit))
    .exec();
  
  const totalCount = await Photo.countDocuments(filterConditions);
  
  return { 
    data, 
    totalCount 
  };
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