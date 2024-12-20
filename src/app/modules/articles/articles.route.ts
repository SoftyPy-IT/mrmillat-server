import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { articleValidation } from './article.validation';
import { ArticleControllers } from './articles.controller';
const router = express.Router();


router.post('/create-article',validationRequest(articleValidation.createArticleValidationSchema), ArticleControllers.createArticle);
router.get('/', ArticleControllers.getAllArticles);
router.get('/:id', ArticleControllers.getSingleArticle);
router.patch('/:id',validationRequest(articleValidation.updateArticleValidationSchema), ArticleControllers.updateArticle);
router.delete('/:id', ArticleControllers.deleteArticle);


export const articleRoutes = router