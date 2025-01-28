import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { AdminServices } from './admin.service';
import { Blog } from '../Blog/blog.model';
  
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const isBlogExist = await Blog.findById({_id:id});
  if(!isBlogExist){
    throw new AppError(httpStatus.NOT_FOUND,'Blog does not exist')
  }
  if(isBlogExist.isDeleted){
    throw new AppError(httpStatus.BAD_REQUEST,'This Blog is already deleted');
  }

  const result = await AdminServices.deleteBlogFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Deleted successfully',
    data: '',
  });
});

export const AdminControllers = {
  deleteBlog,
};
