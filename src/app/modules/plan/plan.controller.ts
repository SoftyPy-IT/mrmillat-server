import { PlanServices } from './plan.services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createPlan = catchAsync(async (req, res) => {
  const Plan = req.body;
  const result = await PlanServices.createPlanIntoDB(Plan);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Plan created successfully',
    data: result,
  });
});

const getAllPlans = catchAsync(async (req, res) => {
  const result = await PlanServices.getAllPlansFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Plans retrieve successfully',
    data: result,
  });
});

const getUpcomingPlans = catchAsync(async (req, res) => {
  const result = await PlanServices.getUpcomingPlansFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Upcoming Plans retrieve successfully',
    data: result,
  });
});

const getSinglePlan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PlanServices.getSinglePlanFromDB(id);
  if (!result) {
    throw new Error('Plan not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Plan retrieve successfully',
    data: result,
  });
});

const updatePlan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const Plan = req.body;
  const result = await PlanServices.updatePlanFromDB(id, Plan);
  if (!result) {
    throw new Error('Plan not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Plan successfully',
    data: result,
  });
});

const deletePlan = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PlanServices.deletePlanFromDB(id);
  if (!result) {
    throw new Error('Plan not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Plan deleted successfully',
    data: result,
  });
});

export const PlanControllers = {
  createPlan,
  getAllPlans,
  getSinglePlan,
  updatePlan,
  deletePlan,
  getUpcomingPlans,
};
