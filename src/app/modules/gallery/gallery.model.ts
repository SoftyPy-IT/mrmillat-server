import { model, Schema } from "mongoose";
import { TGallery } from "./gallery.interface";


const gallerySchema = new Schema<TGallery>({
  title:{
    type:String,
    required:[true,"title is required"],
    unique:true
  },
 
  imageUrl:{
    type:String,
    required:[true,"Image url is required"],
    unique:true
  },
   date:{
    type:Date
  }
},
{
  timestamps:true
})



export const Gallery = model<TGallery>('Gallery',gallerySchema);