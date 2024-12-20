import { TLogin } from "./auth.interface";
import { User } from "../users/users.model";

const loginUser = async(payload:TLogin)=>{
const user =await User.findOne({email:payload.email});

if(!user){
  throw new Error(
    'User is not Exist'
  )
}
const userStatus = user?.status;
if(userStatus==='blocked'){
  throw Error(
    'user is blocked!'
  )
}

return null;
}

export const authServices ={
  loginUser
}