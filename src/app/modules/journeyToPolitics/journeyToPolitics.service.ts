import { TJourneyToPolitics } from "./journeyToPolitics.interface";
import { JourneyToPolitics } from "./journeyToPolitics.model";

const createJourneyToPoliticsIntoDB = async(payload:TJourneyToPolitics)=>{
const result = await JourneyToPolitics.create(payload);
return result;
}

const getAllJourneyToPoliticsFromDB = async()=>{
const result = await JourneyToPolitics.find();
return result;
}

const getSingleJourneyToPoliticsFromDB = async(id:string)=>{
const result = await JourneyToPolitics.findById(id);
return result;
}

const updateJourneyToPoliticsFromDB = async(id:string,payload:Partial<TJourneyToPolitics>)=>{
const result = await JourneyToPolitics.findByIdAndUpdate(id,payload,{new:true});
return result;
}

const deleteJourneyToPoliticsFromDB = async(id:string)=>{
const result = await JourneyToPolitics.findByIdAndDelete(id);
return result;
}


export const JourneyToPoliticsServices ={
  createJourneyToPoliticsIntoDB,
  getAllJourneyToPoliticsFromDB,
  getSingleJourneyToPoliticsFromDB,
  updateJourneyToPoliticsFromDB,
  deleteJourneyToPoliticsFromDB
}