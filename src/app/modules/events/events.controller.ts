import { EventServices } from './events.services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createEvent = catchAsync(async (req, res) => {
  const event = req.body;
  const result = await EventServices.createEventIntoDB(event);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Event created successfully',
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const result = await EventServices.getAllEventsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Events retrieve successfully',
    data: result,
  });
});

const getUpcomingEvents = catchAsync(async (req, res) => {
  const result = await EventServices.getUpcomingEventsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Upcoming Events retrieve successfully',
    data: result,
  });
});

const getSingleEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EventServices.getSingleEventFromDB(id);
  if (!result) {
    throw new Error('event not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Event retrieve successfully',
    data: result,
  });
});

const updateEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const event = req.body;
  const result = await EventServices.updateEventFromDB(id, event);
  if (!result) {
    throw new Error('event not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Event successfully',
    data: result,
  });
});

const deleteEvent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await EventServices.deleteEventFromDB(id);
  if (!result) {
    throw new Error('event not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Event deleted successfully',
    data: result,
  });
});

export const EventControllers = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
};
