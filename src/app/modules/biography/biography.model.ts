import { model, Schema } from 'mongoose';
import { TBiography, TItem } from './biography.interface';

export const action = ['add', 'update', 'delete'];

const itemSchema = new Schema<TItem>(
  {
    action: {
      type: String,
      enum: action,
      default: 'add',
    },
    itemTitle: {
      type: String,
      required: true,
    },
    itemDescription: {
      type: String,
      required: true,
    },
  },
  { _id: true, timestamps: true },
);

const biographySchema = new Schema<TBiography>(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    items: [itemSchema],
  },
  { timestamps: true },
);

export const Biography = model<TBiography>('Biography', biographySchema);
