import QueryBuilder from "../../builders/QueryBuilder";
import { TVideo } from "./video.interface";
import { Video } from "./video.model";


const createVideoIntoDB = async(payload:TVideo)=>{
const result = await Video.create(payload);
return result;
}

const getAllVideoFromDB = async(query:Record<string,unknown>)=>{
const VideoQuery = new QueryBuilder(Video.find(),query).paginate();
const result = await VideoQuery.modelQuery;
return result;
}

const getSingleVideoFromDB = async(id:string)=>{
const result = await Video.findById(id);
return result;
}

const deleteVideoFromDB = async(id:string)=>{
const result = await Video.findByIdAndDelete(id);
return result;
}


export const VideoServices ={
  createVideoIntoDB,
  getAllVideoFromDB,
  getSingleVideoFromDB,
  deleteVideoFromDB
}