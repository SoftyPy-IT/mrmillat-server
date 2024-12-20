import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./users.services";

const createUser = catchAsync(
  async(req,res)=>{
    const user = req.body; 
    const result = await UserServices.createUserIntoDB(user); 
  
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"User created successfully",
      data:result
    })
  }
)

const getAllUser = catchAsync(
  async(req,res)=>{
    const result = await UserServices.getAllUserFromDB(); 
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"All User retrieve successfully",
      data:result
    })
  }
)

const getSingleUser = catchAsync(
  async(req,res)=>{
    const {id} = req.params;  
    const result = await UserServices.getSingleUserFromDB(id); 
    if (!result) {
     throw new Error("User not found");
    }
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"Single User retrieve successfully",
      data:result
    })
  }
)


const updateUserProfile = catchAsync(
  async(req,res)=>{
    const {id} = req.params; 
    const User = req.body; 
    const result = await UserServices.updateUserProfileFromDB(id,User); 
    if (!result) {
      throw new Error("User not found");
    }
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"Update User Profile successfully",
      data:result
    })
  }
)
const changePassword = catchAsync(
  async(req,res)=>{
    const {id} = req.params; 
    const User = req.body; 
    const result = await UserServices.changePasswordIntoDB(id,User); 
    if (!result) {
      throw new Error("User not found");
    }
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"Password is changed successfully",
      data:result
    })
  }
)

const deleteUser = catchAsync(
  async(req,res)=>{
    const {id} = req.params; 
    const result = await UserServices.deleteUserFromDB(id); 
    if (!result) {
      throw new Error("User not found");
    }
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"User deleted successfully",
      data:result
    })
  }
)


export const UserControllers ={
  createUser,
  getAllUser,
  getSingleUser,
  updateUserProfile,
  deleteUser,
  changePassword
}

