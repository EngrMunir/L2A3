import { z } from "zod";

// Define Zod schema for blog validation
export const createBlogValidationSchema = z.object({
  body:z.object({
    title: z.string().min(1, { message: "Title must not be empty" }),  
    content: z.string({
      required_error: "Content is required",
    }).min(1, { message: "Content must not be empty" }),
  
    author: z.string(),
    isPublished: z.boolean()
  })
})