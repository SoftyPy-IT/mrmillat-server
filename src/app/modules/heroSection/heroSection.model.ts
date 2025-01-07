import { model, Schema } from 'mongoose';
import { THeroSection } from './heroSection.interface';

const HeroSectionSchema = new Schema<THeroSection>({
  category: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subTitle: { type: String, required: true },
  bgImageForLg: { type: String, required: true },
  bgImageForSm: { type: String, required: true },
});

export const HeroSection = model<THeroSection>(
  'HeroSection',
  HeroSectionSchema,
);
