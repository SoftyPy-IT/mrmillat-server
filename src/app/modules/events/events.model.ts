import { model, Schema } from 'mongoose';
import { TEvent } from './events.interface';

const EventScheme = new Schema<TEvent>(
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

EventScheme.pre('save', async function (next) {
  const title = this.title;
  const titleIsExist = await Event.findOne({ title: title });
  if (titleIsExist) {
    throw new Error('The Event is already exist');
  }
  next();
});

export const Event = model<TEvent>('Event', EventScheme);
