import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";
import { Types } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  _id: Types.ObjectId;
};


export interface UserModel extends Model<TUser>{
  // instance methods for checking if the user exist
  isUserExistsByEmail(email:string):Promise<TUser>;
  // instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword:string,
    hashedPassword:string,
  ): Promise<boolean>;
};

export type TUserRole = keyof typeof USER_ROLE;