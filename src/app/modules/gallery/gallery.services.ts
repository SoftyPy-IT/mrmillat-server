import QueryBuilder from "../../builders/QueryBuilder";
import { TGallery } from "./gallery.interface";
import { Gallery } from "./gallery.model";

const createGalleryIntoDB = async(payload:TGallery)=>{
const result = await Gallery.create(payload);
return result;
}

const getAllGalleryFromDB = async(query:Record<string,unknown>)=>{
const GalleryQuery = new QueryBuilder(Gallery.find(),query).paginate();

const result = await GalleryQuery.modelQuery;

return result;
}

const getSingleGalleryFromDB = async(id:string)=>{
const result = await Gallery.findById(id);
return result;
}

const updateGalleryFromDB = async(id:string,payload:Partial<TGallery>)=>{
const result = await Gallery.findByIdAndUpdate(id,payload,{new:true});
return result;
}

const deleteGalleryFromDB = async(id:string)=>{
const result = await Gallery.findByIdAndDelete(id);
return result;
}


export const GalleryServices ={
  createGalleryIntoDB,
  getAllGalleryFromDB,
  getSingleGalleryFromDB,
  updateGalleryFromDB,
  deleteGalleryFromDB
}