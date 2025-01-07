import QueryBuilder from '../../builders/QueryBuilder';
import { TEvent } from './events.interface';
import { Event } from './events.model';

const createEventIntoDB = async (payload: TEvent) => {
  const result = await Event.create(payload);
  return result;
};

const getAllEventsFromDB = async (query: Record<string, unknown>) => {
  const currentDate = new Date();
  if (query?.type && query.type === 'upcoming') {
    const data = await Event.find({ date: { $gt: currentDate } });
    const totalCount = await Event.countDocuments({
      date: { $gt: currentDate },
    });
    const result = { data, totalCount };
    return result;
  }
  if (query?.type && query.type === 'previous') {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 6;
    const skip = (page - 1) * limit;
    const data = await Event.find({ date: { $lte: currentDate } })
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);
    const totalCount = await Event.countDocuments({
      date: { $lte: currentDate },
    });
    const result = { data, totalCount };
    return result;
  }

  const eventsQuery = new QueryBuilder(Event.find(), query)
    .filter()
    .paginate()
    .sort();

  const data = await eventsQuery.modelQuery;
  const totalCount = await Event.countDocuments();
  const result = { data, totalCount };
  return result;
};

const getUpcomingEventsFromDB = async () => {
  const now = new Date();
  const result = await Event.find({ date: { $gt: now } }).sort({ date: 1 });
  return result;
};

const getSingleEventFromDB = async (id: string) => {
  const result = await Event.findById(id);
  return result;
};

const updateEventFromDB = async (id: string, payload: Partial<TEvent>) => {
  const updatedTitle = payload?.title;
  const thisEvent = await Event.findById(id);
  const isExistEvent = await Event.findOne({ title: updatedTitle });

  if (isExistEvent && thisEvent?.title !== updatedTitle) {
    throw new Error('The Event is already exist! please choose another one.');
  }
  const result = await Event.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteEventFromDB = async (id: string) => {
  const result = await Event.findByIdAndDelete(id);
  return result;
};

export const EventServices = {
  createEventIntoDB,
  getAllEventsFromDB,
  getSingleEventFromDB,
  updateEventFromDB,
  deleteEventFromDB,
  getUpcomingEventsFromDB,
};
