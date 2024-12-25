import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { VideoServices } from "./video.service";

const createVideo = catchAsync(
  async(req,res)=>{
    const Video = req.body; 
    const result = await VideoServices.createVideoIntoDB(Video); 
  
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"Video created successfully",
      data:result
    })
  }
)

const getAllVideos = catchAsync(
  async(req,res)=>{
    const result = await VideoServices.getAllVideoFromDB(req.query); 
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"All Video retrieve successfully",
      data:result
    })
  }
)

const getSingleVideo = catchAsync(
  async(req,res)=>{
    const {id} = req.params;  
    const result = await VideoServices.getSingleVideoFromDB(id); 
    if (!result) {
     throw new Error("Video not found");
    }
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"Single Video retrieve successfully",
      data:result
    })
  }
)


const deleteVideo = catchAsync(
  async(req,res)=>{
    const {id} = req.params; 
    const result = await VideoServices.deleteVideoFromDB(id); 
    if (!result) {
      throw new Error("Video not found");
    }
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"Video deleted successfully",
      data:result
    })
  }
)


export const VideoControllers ={
  createVideo,
  getAllVideos,
  getSingleVideo,
  deleteVideo
}

