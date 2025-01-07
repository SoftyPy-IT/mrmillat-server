import { model, Schema } from 'mongoose';
import { TJourneyToPolitics } from './journeyToPolitics.interface';

const JourneyToPoliticsSchema = new Schema<TJourneyToPolitics>(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

JourneyToPoliticsSchema.pre('save', async function (next) {
  const title = this.title;
  const titleIsExist = await JourneyToPolitics.findOne({ title: title });
  if (titleIsExist) {
    throw new Error('The title is already exist');
  }
  next();
});

export const JourneyToPolitics = model<TJourneyToPolitics>(
  'JourneyToPolitics',
  JourneyToPoliticsSchema,
);
