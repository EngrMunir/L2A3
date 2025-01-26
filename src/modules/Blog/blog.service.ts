import AppError from "../../app/errors/AppError";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import httpStatus from 'http-status';

const createBlogIntoDB =async(payload:Partial<TBlog>)=>{

    console.log(payload);
    
    const newBlog = await Blog.create(payload);

    if(!newBlog){
        throw new AppError(httpStatus.BAD_REQUEST,'Failed to create blog');
    }

    return newBlog;
}

const deleteBlogFromDB = async(id:string)=>{
    const deletedBlog = await Blog.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {new:true}
    )
    if (!deletedBlog) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
      }
      return deletedBlog;
}


export const BlogServices ={
    createBlogIntoDB,
    deleteBlogFromDB
}