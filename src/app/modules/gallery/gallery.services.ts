import QueryBuilder from '../../builders/QueryBuilder';
import { TGallery } from './gallery.interface';
import { Gallery } from './gallery.model';

const createGalleryIntoDB = async (payload: TGallery) => {
  const result = await Gallery.create(payload);
  return result;
};

const getAllGalleryFromDB = async (query: Record<string, unknown>) => {
  const GalleryQuery = new QueryBuilder(Gallery.find(), query).paginate().sort();
  const data = await GalleryQuery.modelQuery;
  const totalCount = await Gallery.countDocuments();
  const result = { data, totalCount };
  return result;
};

const getSingleGalleryFromDB = async (id: string) => {
  const result = await Gallery.findById(id);
  return result;
};

const updateGalleryFromDB = async (id: string, payload: Partial<TGallery>) => {
  const updatedImageUrl = payload?.imageUrl;
  const thisGallery = await Gallery.findById(id);
  const isExistGallery = await Gallery.findOne({ imageUrl: updatedImageUrl });
  if (isExistGallery && thisGallery?.imageUrl !== updatedImageUrl) {
    throw new Error('The Article is already exist! please choose another one.');
  }

  const result = await Gallery.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteGalleryFromDB = async (id: string) => {
  const result = await Gallery.findByIdAndDelete(id);
  return result;
};

export const GalleryServices = {
  createGalleryIntoDB,
  getAllGalleryFromDB,
  getSingleGalleryFromDB,
  updateGalleryFromDB,
  deleteGalleryFromDB,
};
