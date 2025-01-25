import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
    {
        title: {
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        author:{
            type: Schema.Types.ObjectId,
            ref:'user'
        },
        isPublished:{
            type:Boolean,
            default:true
        }
    }
);

export const Blog = model<TBlog>('Blog', blogSchema);