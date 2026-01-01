import { model, Schema } from 'mongoose';
import { TPhotoCards } from './photocards.interface';

const photoCardsSchema = new Schema<TPhotoCards>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image url is required'],
      unique: true,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

photoCardsSchema.pre('save', async function (next) {
  const imageUrl = this.imageUrl;
  const titleIsExist = await PhotoCards.findOne({ imageUrl });
  if (titleIsExist) {
    throw new Error('The Photo is already exist');
  }
  next();
});

export const PhotoCards = model<TPhotoCards>('PhotoCards', photoCardsSchema);
