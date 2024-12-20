import { model, Schema } from "mongoose";
import { TJourneyToPolitics } from "./journeyToPolitics.interface";

const JourneyToPoliticsSchema = new Schema<TJourneyToPolitics>({
  title:{
    type:String,
    required:true,
    unique:true
  },
  shortDescription:{
    type:String,
    required:true,
  },
},{
  timestamps:true
})

export const JourneyToPolitics = model<TJourneyToPolitics>('JourneyToPolitics',JourneyToPoliticsSchema)