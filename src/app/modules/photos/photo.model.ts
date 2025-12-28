// photo.model.ts
import { model, Schema } from 'mongoose';
import { TPhoto } from './photo.interface';

const photoSchema = new Schema<TPhoto>(
  {
    folder: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   required: true,
    // },
  },
  {
    // Don't use timestamps since we have explicit createdAt
  },
);

export const Photo = model<TPhoto>('Photo', photoSchema);
