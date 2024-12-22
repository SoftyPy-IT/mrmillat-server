import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
  name:string;
  email:string;
  password:string;
  imageUrl?:string;
  status:'in-progress'|'blocked';
  role:"admin"|"editor";
};

export interface UserModel extends Model<IUser>{
  isPasswordMatched(plainTextPassword:string,hashedPassword:string):Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE;