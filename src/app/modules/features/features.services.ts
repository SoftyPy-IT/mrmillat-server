import { TFeatures } from "./features.interface";
import { Feature } from "./features.model";

const getAllFeaturesFromDB = async()=>{
const result = await Feature.find();
return result;
}


const updateFeaturesFromDB = async(id:string,payload:Partial<TFeatures>)=>{
const result = await Feature.findByIdAndUpdate(id,payload,{new:true});
return result;
}




export const FeaturesServices ={
  getAllFeaturesFromDB,
  updateFeaturesFromDB,
}