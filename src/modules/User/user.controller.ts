import AppError from '../../app/errors/AppError';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { User } from './user.model';
import { UserServices } from './user.service';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  const filteredData = {
    _id: result._id,
    name: result.name,
    email: result.email,
  };
  // console.log(result)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered Successfully',
    data: filteredData,
  });
});
const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  
  const user = await User.findById(userId);
  // check if the user is exists
  if(!user){
    throw new AppError(httpStatus.BAD_REQUEST, 'This user does not exists')
  }
  // check if the user is already blocked
  if(user.isBlocked){
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is already deleted')
  }
  const result = await UserServices.blockUserIntoDB(userId);

  sendResponse(res, { 
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const UserControllers = {
  createUser,
  blockUser
};
