import QueryBuilder from '../../builders/QueryBuilder';
import { TJourneyToPolitics } from './journeyToPolitics.interface';
import { JourneyToPolitics } from './journeyToPolitics.model';

const createJourneyToPoliticsIntoDB = async (payload: TJourneyToPolitics) => {
  const result = await JourneyToPolitics.create(payload);
  return result;
};

const getAllJourneyToPoliticsFromDB = async (
  query: Record<string, unknown>,
) => {
  const journeyToPoliticsQuery = new QueryBuilder(
    JourneyToPolitics.find(),
    query,
  ).paginate();

  const data = await journeyToPoliticsQuery.modelQuery;
  const totalCount = await JourneyToPolitics.countDocuments();
  const result = { data, totalCount };
  return result;
};

const getSingleJourneyToPoliticsFromDB = async (id: string) => {
  const result = await JourneyToPolitics.findById(id);
  return result;
};

const updateJourneyToPoliticsFromDB = async (
  id: string,
  payload: Partial<TJourneyToPolitics>,
) => {
  const updatedTitle = payload?.title;
  const thisJourneyToPolitics = await JourneyToPolitics.findById(id);
  const isExistJourneyToPolitics = await JourneyToPolitics.findOne({
    title: updatedTitle,
  });

  if (
    isExistJourneyToPolitics &&
    thisJourneyToPolitics?.title !== updatedTitle
  ) {
    throw new Error('The Title is already exist! please choose another one.');
  }

  const result = await JourneyToPolitics.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteJourneyToPoliticsFromDB = async (id: string) => {
  const result = await JourneyToPolitics.findByIdAndDelete(id);
  return result;
};

export const JourneyToPoliticsServices = {
  createJourneyToPoliticsIntoDB,
  getAllJourneyToPoliticsFromDB,
  getSingleJourneyToPoliticsFromDB,
  updateJourneyToPoliticsFromDB,
  deleteJourneyToPoliticsFromDB,
};
