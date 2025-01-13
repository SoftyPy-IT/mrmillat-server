import QueryBuilder from '../../builders/QueryBuilder';
import { TArticle } from './articles.interface';
import { Article } from './articles.model';

const createArticlesIntoDB = async (payload: TArticle) => {
  const result = await Article.create(payload);
  return result;
};

const getAllArticlesFromDB = async (query: Record<string, unknown>) => {
  const ArticlesQuery = new QueryBuilder(Article.find(), query).paginate().sort();

  const data = await ArticlesQuery.modelQuery;
  const totalCount = await Article.countDocuments();
  const result = { data, totalCount };
  return result;
};

const getSingleArticleFromDB = async (id: string) => {
  const result = await Article.findById(id);
  return result;
};

const updateArticleFromDB = async (id: string, payload: Partial<TArticle>) => {
  const updatedTitle = payload?.title;
  const thisArticle = await Article.findById(id);
  const isExistArticle = await Article.findOne({ title: updatedTitle });

  if (isExistArticle && thisArticle?.title !== updatedTitle) {
    throw new Error('The Article is already exist! please choose another one.');
  }

  const result = await Article.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteArticleFromDB = async (id: string) => {
  const result = await Article.findByIdAndDelete(id);
  return result;
};

export const ArticleServices = {
  createArticlesIntoDB,
  getAllArticlesFromDB,
  getSingleArticleFromDB,
  updateArticleFromDB,
  deleteArticleFromDB,
};
