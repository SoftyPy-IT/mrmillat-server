import QueryBuilder from '../../builders/QueryBuilder';
import { TPlan } from './plan.interface';
import { Plan } from './plan.model';

const createPlanIntoDB = async (payload: TPlan) => {
  const result = await Plan.create(payload);
  return result;
};

const getAllPlansFromDB = async (query: Record<string, unknown>) => {
  const currentDate = new Date();
  if (query?.type && query.type === 'upcoming') {
    const data = await Plan.find({ date: { $gt: currentDate } });
    const totalCount = await Plan.countDocuments({
      date: { $gt: currentDate },
    });
    const result = { data, totalCount };
    return result;
  }
  if (query?.type && query.type === 'previous') {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 6;
    const skip = (page - 1) * limit;
    const data = await Plan.find({ date: { $lte: currentDate } })
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);
    const totalCount = await Plan.countDocuments({
      date: { $lte: currentDate },
    });
    const result = { data, totalCount };
    return result;
  }

  const PlansQuery = new QueryBuilder(Plan.find(), query)
    .filter()
    .paginate()
    .sort();

  const data = await PlansQuery.modelQuery;
  const totalCount = await Plan.countDocuments();
  const result = { data, totalCount };
  return result;
};

const getUpcomingPlansFromDB = async () => {
  const now = new Date();
  const result = await Plan.find({ date: { $gt: now } }).sort({ date: 1 });
  return result;
};

const getSinglePlanFromDB = async (id: string) => {
  const result = await Plan.findById(id);
  return result;
};

const updatePlanFromDB = async (id: string, payload: Partial<TPlan>) => {
  const updatedTitle = payload?.title;
  const thisPlan = await Plan.findById(id);
  const isExistPlan = await Plan.findOne({ title: updatedTitle });

  if (isExistPlan && thisPlan?.title !== updatedTitle) {
    throw new Error('The Plan is already exist! please choose another one.');
  }
  const result = await Plan.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deletePlanFromDB = async (id: string) => {
  const result = await Plan.findByIdAndDelete(id);
  return result;
};

export const PlanServices = {
  createPlanIntoDB,
  getAllPlansFromDB,
  getSinglePlanFromDB,
  updatePlanFromDB,
  deletePlanFromDB,
  getUpcomingPlansFromDB,
};
