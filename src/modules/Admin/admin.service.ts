import httpStatus from 'http-status';
import { Blog } from '../Blog/blog.model';
import AppError from '../../app/errors/AppError';


const deleteBlogFromDB = async (id: string) => {
  const deletedBlog = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!deletedBlog) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Blog');
  }
  return deletedBlog;
};

export const AdminServices = {
  deleteBlogFromDB,
};
