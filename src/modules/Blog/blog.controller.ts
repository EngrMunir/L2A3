import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from 'http-status';
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res)=>{

    const result = await BlogServices.createBlogIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success:true,
        message:'Blog created successfully',
        data:result
    })
});

const getAllBlog = catchAsync(async (req, res) =>{
    const result = await BlogServices.getAllBlogFromDB();
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:'Blogs fetched successfully',
        data:result
    })
})

const deleteBlog = catchAsync(async (req, res)=>{
    const { id } = req.params;
    const result = await BlogServices.deleteBlogFromDB(id);
    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:'Blog Deleted successfully',
        data:result
    })
})

export const BlogControllers ={
    createBlog,
    getAllBlog,
    deleteBlog
}