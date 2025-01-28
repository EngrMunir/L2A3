import AppError from '../../app/errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';

const createUserIntoDB = async (payload: Partial<TUser>) => {
  payload.role = 'user';

  const newUser = await User.create(payload);

  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  return newUser;
};

const blockUserIntoDB = async (id:string)=>{

  console.log('update uer id service:',id);

  const blockUser = await User.findOneAndUpdate(
    {_id:id},
    {isBlocked:true},
    {new:true}
  )
  return blockUser;
}


export const UserServices = {
  createUserIntoDB,
  blockUserIntoDB,
};
