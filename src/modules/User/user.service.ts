import { TUser } from "./user.interface";

const createUserIntoDB = async(payload:Partial<TUser>)=>{

    console.log(payload);

}

export const UserServices = {
    createUserIntoDB
}