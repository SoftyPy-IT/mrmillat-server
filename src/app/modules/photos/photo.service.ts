/* eslint-disable @typescript-eslint/no-explicit-any */
// import QueryBuilder from '../../builders/QueryBuilder';
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


// photo.service.ts - HARD CODED SOLUTION
const getAllPhotoFromDB = async (query: Record<string, unknown>) => {
  const { folder, page = 1, limit = 12 } = query;
  
  // Build filter conditions
  const filterConditions: any = {};
  if (folder) {
    filterConditions.folder = folder;
  }
  
  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);
  
  // Execute query with FORCED sorting by _id descending (newest first)
  const data = await Photo.find(filterConditions)
    .sort({ _id: -1 }) // Force LIFO (Last In First Out)
    .skip(skip)
    .limit(Number(limit))
    .exec();
  
  // Get total count
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
