import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from 'http-status';


const createUser = catchAsync(async(req, res)=>{

    console.log(req.body);
    const result = await UserServices.createUserIntoDB(req.body);

    const filteredData = {
        _id: result._id,
        name: result.name,
        email: result.email,
      };
    // console.log(result)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success:true,
        message:'User registered Successfully',
        data:filteredData
    })
})

export const UserControllers ={
    createUser,
}