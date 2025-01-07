import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { ArticleServices } from './articles.services';

const createArticle = catchAsync(async (req, res) => {
  const article = req.body;
  const result = await ArticleServices.createArticlesIntoDB(article);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Article created successfully',
    data: result,
  });
});

const getAllArticles = catchAsync(async (req, res) => {
  const result = await ArticleServices.getAllArticlesFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Articles retrieve successfully',
    data: result,
  });
});

const getSingleArticle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ArticleServices.getSingleArticleFromDB(id);
  if (!result) {
    throw new Error('Article not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Article retrieve successfully',
    data: result,
  });
});

const updateArticle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const article = req.body;
  const result = await ArticleServices.updateArticleFromDB(id, article);
  if (!result) {
    throw new Error('Article not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update Article successfully',
    data: result,
  });
});

const deleteArticle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ArticleServices.deleteArticleFromDB(id);
  if (!result) {
    throw new Error('Article not found');
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Article deleted successfully',
    data: result,
  });
});

export const ArticleControllers = {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
};
