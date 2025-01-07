import { model, Schema } from 'mongoose';
import { TGallery } from './gallery.interface';

const gallerySchema = new Schema<TGallery>(
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

gallerySchema.pre('save', async function (next) {
  const imageUrl = this.imageUrl;
  const titleIsExist = await Gallery.findOne({ imageUrl });
  if (titleIsExist) {
    throw new Error('The Photo is already exist');
  }
  next();
});

export const Gallery = model<TGallery>('Gallery', gallerySchema);
