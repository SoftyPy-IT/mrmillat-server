import { Model } from "mongoose";

export interface IUser {
  name:string;
  email:string;
  password:string;
  newPassword?:string;
  confirmPassword?:string;
  imageUrl?:string;
  status:'in-progress'|'blocked';
  role:"admin"|"editor";
};

export interface UserModel extends Model<IUser>{
  isPasswordMatched(plainTextPassword:string,hashedPassword:string):Promise<boolean>
}