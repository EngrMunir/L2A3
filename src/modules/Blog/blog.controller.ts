import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import { BlogServices } from './blog.service';
import config from '../../app/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../app/errors/AppError';
import { User } from '../User/user.model';
import { Blog } from './blog.model';

const createBlog = catchAsync(async (req, res) => {

  const token = req.headers.authorization?.split(' ')[1];
  let decoded;
        try {
            // check if the given token is valid
            decoded = jwt.verify(
                token as string,
                config.jwt_access_secret as string,
            ) as JwtPayload;
        } catch (err) {
            throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized');
        }

        const { userEmail } = decoded;
        const user = await User.isUserExistsByEmail(userEmail);
          // Extract title and content from request body
        const { title, content } = req.body;

        // Create the blog data
        const blogData = {
          title,
          content,
          isPublished: true,
          isDeleted: false,
          author: user._id,
        };

  const result = await BlogServices.createBlogIntoDB(blogData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlog = catchAsync(async (req, res) => {
  console.log(req.query);
  const result = await BlogServices.getAllBlogFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const token = req.headers.authorization?.split(' ')[1];
  let decoded;
        try {
            // check if the given token is valid
            decoded = jwt.verify(
                token as string,
                config.jwt_access_secret as string,
            ) as JwtPayload;
        } catch (err) {
            throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized');
        }

        const { userEmail } = decoded;
        const user = await User.isUserExistsByEmail(userEmail);
        const singleBlog = await BlogServices.getSingleBlogFromDB(id);
        
        // user._id === blog.author
        if(user._id !== singleBlog?.author){
          throw new AppError(httpStatus.BAD_REQUEST,'This blog is not yours');
        }
  const result = await BlogServices.updateBlogIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Updated successfully',
    data: result,
  });
});
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const token = req.headers.authorization?.split(' ')[1];
  let decoded;
        try {
            // check if the given token is valid
            decoded = jwt.verify(
                token as string,
                config.jwt_access_secret as string,
            ) as JwtPayload;
        } catch (err) {
            throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized');
        }

        const { userEmail } = decoded;
        const user = await User.isUserExistsByEmail(userEmail);
        const singleBlog = await BlogServices.getSingleBlogFromDB(id);
        
        // user._id === blog.author
        if(user._id !== singleBlog?.author){
          throw new AppError(httpStatus.BAD_REQUEST,'This blog is not yours');
        }

  const result = await BlogServices.deleteBlogFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Deleted successfully',
    data: '',
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
