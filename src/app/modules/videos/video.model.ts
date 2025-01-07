import { model, Schema } from 'mongoose';
import { TVideo } from './video.interface';

const videoSchema = new Schema<TVideo>({
  folder: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

export const Video = model<TVideo>('Video', videoSchema);
