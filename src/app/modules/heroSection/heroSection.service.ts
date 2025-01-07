import { THeroSection } from './heroSection.interface';
import { HeroSection } from './heroSection.model';

const getAllHeroSectionFromDB = async () => {
  const result = await HeroSection.find();
  return result;
};
const getSingleHeroSectionFromDB = async (id: string) => {
  const result = await HeroSection.findById(id);
  return result;
};

const updateHeroSectionFromDB = async (
  id: string,
  payload: Partial<THeroSection>,
) => {
  const result = await HeroSection.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const HeroSectionServices = {
  getAllHeroSectionFromDB,
  updateHeroSectionFromDB,
  getSingleHeroSectionFromDB,
};
