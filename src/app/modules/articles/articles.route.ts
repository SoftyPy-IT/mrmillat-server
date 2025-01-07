import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { articleValidation } from './article.validation';
import { ArticleControllers } from './articles.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-article',
  auth('admin', 'editor'),
  validationRequest(articleValidation.createArticleValidationSchema),
  ArticleControllers.createArticle,
);
router.get('/', ArticleControllers.getAllArticles);
router.get('/:id', ArticleControllers.getSingleArticle);
router.patch(
  '/:id',
  auth('admin', 'editor'),
  validationRequest(articleValidation.updateArticleValidationSchema),
  ArticleControllers.updateArticle,
);
router.delete(
  '/:id',
  auth('admin', 'editor'),
  ArticleControllers.deleteArticle,
);

export const articleRoutes = router;
