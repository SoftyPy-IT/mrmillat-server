import config from "../../config";
import { IUser } from "./users.interface";
import { User } from "./users.model";
import bcrypt from "bcrypt";


const createUserIntoDB = async(payload:IUser)=>{
const result = await User.create(payload);
return result;
}

const getAllUserFromDB = async()=>{
const result = await User.find()
return result;
}

const getSingleUserFromDB = async(id:string)=>{
const result = await User.findById(id);
return result;
}



const updateUserProfileFromDB = async(id:string,payload:Partial<IUser>)=>{

const isUserExist = await User.findById(id);

if(!isUserExist){
  throw new Error('Users does not exist')
} 

if(payload?.status && isUserExist.role==='editor'){
    await User.findByIdAndUpdate(id,{
    $set:{
     status:payload?.status
    }
  },{new:true});
}

const isNewEmailExist = await User.findOne({email:payload?.email});
if(isNewEmailExist && isUserExist.email!==payload?.email){
  throw new Error("This email is already exist! please try another")
}

const result = await User.findByIdAndUpdate(id,{
  $set:{
   name:payload?.name || isUserExist?.name,
   email:payload?.email || isUserExist?.email,
   imageUrl:payload?.imageUrl|| isUserExist?.imageUrl,
  }
},{new:true});

return result;
}

const changePasswordIntoDB =async (id:string,payload:Partial<IUser>) =>{
  const isUserExist = await User.findById(id);
  if(!isUserExist){
    throw new Error('Users does not exist')
  } 
  
 // (await User.isPasswordMatched(payload?.password as string , isUserExist.password)) &&

  if(!(await User.isPasswordMatched(payload?.password as string , isUserExist.password))){
    throw new Error('Invalid Password! please try again') 
  }

  if( payload?.newPassword===payload?.confirmPassword){
  const updatedPassword= await bcrypt.hash(payload?.newPassword as string,Number(config.bcrypt_solt))
  
   const result= await User.findByIdAndUpdate(id,{
      $set:{
        password: updatedPassword
      }
    },{new:true});

    return result  
  }

  throw new Error('Your new Password and confirm password does not match! please try again')

}

const deleteUserFromDB = async(id:string)=>{
const result = await User.findByIdAndDelete(id);
return result;
}

export const UserServices ={
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserProfileFromDB,
  changePasswordIntoDB,
  deleteUserFromDB
}

