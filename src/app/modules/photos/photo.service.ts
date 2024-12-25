import QueryBuilder from "../../builders/QueryBuilder";
import { TPhoto } from "./photo.interface";
import { Photo } from "./photo.model";

const createPhotoIntoDB = async(payload:TPhoto)=>{
const result = await Photo.create(payload);
return result;
}

const getAllPhotoFromDB = async(query:Record<string,unknown>)=>{
const PhotoQuery = new QueryBuilder(Photo.find(),query).paginate();
const result = await PhotoQuery.modelQuery;
return result;
}

const getSinglePhotoFromDB = async(id:string)=>{
const result = await Photo.findById(id);
return result;
}

const deletePhotoFromDB = async(id:string)=>{
const result = await Photo.findByIdAndDelete(id);
return result;
}


export const PhotoServices ={
  createPhotoIntoDB,
  getAllPhotoFromDB,
  getSinglePhotoFromDB,
  deletePhotoFromDB
}