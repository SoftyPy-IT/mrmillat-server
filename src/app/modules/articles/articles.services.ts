import QueryBuilder from "../../builders/QueryBuilder";
import { TArticle } from "./articles.interface";
import { Article } from "./articles.model";

const createArticlesIntoDB = async(payload:TArticle)=>{
const result = await Article.create(payload);
return result;
}

const getAllArticlesFromDB = async(query:Record<string,unknown>)=>{
const ArticlesQuery = new QueryBuilder(Article.find(),query).paginate();

const result = await ArticlesQuery.modelQuery;

return result;
}

const getSingleArticleFromDB = async(id:string)=>{
const result = await Article.findById(id);
return result;
}

const updateArticleFromDB = async(id:string,payload:Partial<TArticle>)=>{
const result = await Article.findByIdAndUpdate(id,payload,{new:true});
return result;
}

const deleteArticleFromDB = async(id:string)=>{
const result = await Article.findByIdAndDelete(id);
return result;
}


export const ArticleServices ={
  createArticlesIntoDB,
  getAllArticlesFromDB,
  getSingleArticleFromDB,
  updateArticleFromDB,
  deleteArticleFromDB
}