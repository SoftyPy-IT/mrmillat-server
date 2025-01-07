import { model, Schema } from 'mongoose';
import { TVoiceOnMedia } from './voiceOnMedia.interface';

const voiceOnMediaSchema = new Schema<TVoiceOnMedia>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },

    videoUrl: {
      type: String,
      required: [true, 'video url is required'],
    },
    // date: {
    //   type: Date,
    // },
  },
  {
    timestamps: true,
  },
);

voiceOnMediaSchema.pre('save', async function (next) {
  const videoUrl = this.videoUrl;
  const titleIsExist = await VoiceOnMedia.findOne({ videoUrl });
  if (titleIsExist) {
    throw new Error('The Media is already exist');
  }
  next();
});

export const VoiceOnMedia = model<TVoiceOnMedia>(
  'VoiceOnMedia',
  voiceOnMediaSchema,
);
