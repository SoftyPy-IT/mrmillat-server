import QueryBuilder from '../../builders/QueryBuilder';
import { TPhotoCards } from './photocards.interface';
import { PhotoCards } from './photocards.model';

const createPhotoCardsIntoDB = async (payload: TPhotoCards) => {
  const result = await PhotoCards.create(payload);
  return result;
};

const getAllPhotoCardsFromDB = async (query: Record<string, unknown>) => {
  const PhotoCardsQuery = new QueryBuilder(PhotoCards.find(), query).paginate().sort();
  const data = await PhotoCardsQuery.modelQuery;
  const totalCount = await PhotoCards.countDocuments();
  const result = { data, totalCount };
  return result;
};

const getSinglePhotoCardsFromDB = async (id: string) => {
  const result = await PhotoCards.findById(id);
  return result;
};

const updatePhotoCardsFromDB = async (id: string, payload: Partial<TPhotoCards>) => {
  const updatedImageUrl = payload?.imageUrl;
  const thisPhotoCards = await PhotoCards.findById(id);
  const isExistPhotoCards = await PhotoCards.findOne({ imageUrl: updatedImageUrl });
  if (isExistPhotoCards && thisPhotoCards?.imageUrl !== updatedImageUrl) {
    throw new Error('This is already exist! please choose another one.');
  }

  const result = await PhotoCards.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deletePhotoCardsFromDB = async (id: string) => {
  const result = await PhotoCards.findByIdAndDelete(id);
  return result;
};

export const PhotoCardsServices = {
  createPhotoCardsIntoDB,
  getAllPhotoCardsFromDB,
  getSinglePhotoCardsFromDB,
  updatePhotoCardsFromDB,
  deletePhotoCardsFromDB,
};
