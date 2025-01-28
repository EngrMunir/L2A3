import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../app/errors/AppError';
import { BlogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import httpStatus from 'http-status';

const createBlogIntoDB = async (payload: Partial<TBlog>) => {
  const newBlog = await Blog.create(payload);

  if (!newBlog) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create blog');
  }

  return newBlog;
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(BlogSearchableFields)
    .filter()
    .sortBy();

  const result = await blogQuery.modelQuery;
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlogIntoDB = async (id: string, payload:Partial<TBlog>) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    {_id: id },
    payload,
    { new: true },
  );
  if (!updatedBlog) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update blog');
  }
  return updatedBlog;
};

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

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
