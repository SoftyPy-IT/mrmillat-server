import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { HeroSectionServices } from './heroSection.service';

const getAllHeroSection = catchAsync(async (req, res) => {
  const result = await HeroSectionServices.getAllHeroSectionFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Hero Section retrieve successfully',
    data: result,
  });
});

const getSingleHeroSection = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await HeroSectionServices.getSingleHeroSectionFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Hero Section retrieve successfully',
    data: result,
  });
});

const updateHeroSection = catchAsync(async (req, res) => {
  const { id } = req.params;
  const HeroSection = req.body;
  const result = await HeroSectionServices.updateHeroSectionFromDB(
    id,
    HeroSection,
  );
  if (!result) {
    throw new Error('Hero Section not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Hero Section successfully',
    data: result,
  });
});

export const HeroSectionControllers = {
  getAllHeroSection,
  updateHeroSection,
  getSingleHeroSection,
};
