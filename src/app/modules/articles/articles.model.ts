import { model, Schema } from 'mongoose';
import { TArticle } from './articles.interface';

const ArticleSchema = new Schema<TArticle>(
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
    publishedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

ArticleSchema.pre('save', async function (next) {
  const title = this.title;
  const titleIsExist = await Article.findOne({ title: title });
  if (titleIsExist) {
    throw new Error('The Article is already exist');
  }
  next();
});

export const Article = model<TArticle>('Article', ArticleSchema);
