import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";
import config from "../../config";


const loginUser = catchAsync(
  async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const {
    refreshToken,
    accessToken
  }= result;

  res.cookie('refreshToken',refreshToken,{
    secure:config.NODE_ENV==='production',
    httpOnly:true
  })
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:' User login successfully',
      data:{
        accessToken,
      }
    })
   
  }
);

const changePassword = catchAsync(
  async(req,res)=>{
    const userData = req.user;
    const passwordData = req.body; 
    const result = await authServices.changePasswordIntoDB(userData,passwordData); 
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:"Password is changed successfully",
      data:result
    })
  }
)






const refreshToken=catchAsync(
  async(req,res) =>{
    const {refreshToken} = req.cookies;
    const result = await authServices.refreshToken(refreshToken);
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success:true,
      message:'access token is retrieve successfully',
      data:result
    })

  }
)



export const authControllers={
  loginUser,
  refreshToken,
  changePassword
}
