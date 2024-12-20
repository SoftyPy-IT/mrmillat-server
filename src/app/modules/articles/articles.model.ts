import { model, Schema } from "mongoose";
import { TArticle } from "./articles.interface";



const ArticleSchema = new Schema<TArticle>({
  title:{
    type:String,
    required:[true,"title is required"],
    unique:true
  },
  description:{
    type:String,
    required:[true,"description is required"]
  },
  imageUrl:{
    type:String,
    required:[true,"image is required"]
  },
  publishedDate:{
    type:Date
  }
},
{
  timestamps:true
})



export const Article = model<TArticle>('Article',ArticleSchema);