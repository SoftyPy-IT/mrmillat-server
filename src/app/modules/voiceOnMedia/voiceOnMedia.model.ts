import { model, Schema } from "mongoose";
import { TVoiceOnMedia } from "./voiceOnMedia.interface";


const voiceOnMediaSchema = new Schema<TVoiceOnMedia>({
  title:{
    type:String,
    required:[true,"title is required"],
    unique:true
  },
 
  videoUrl:{
    type:String,
    required:[true,"video url is required"],
    unique:true
  },
   date:{
    type:Date
  }
},
{
  timestamps:true
})



export const VoiceOnMedia = model<TVoiceOnMedia>('VoiceOnMedia',voiceOnMediaSchema);