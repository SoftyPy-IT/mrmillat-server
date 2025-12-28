import { model, Schema } from 'mongoose';
import { TPlan } from './plan.interface';

const PlanScheme = new Schema<TPlan>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    shortDescription: {
      type: String,
      required: [true, 'shortDescription is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'image is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

PlanScheme.pre('save', async function (next) {
  const title = this.title;
  const titleIsExist = await Plan.findOne({ title: title });
  if (titleIsExist) {
    throw new Error('The Plan is already exist');
  }
  next();
});

export const Plan = model<TPlan>('Plan', PlanScheme);
