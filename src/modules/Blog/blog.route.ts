import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { createBlogValidationSchema } from './blog.validation';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.post(
    '/blogs',
    validateRequest(createBlogValidationSchema),
    BlogControllers.createBlog
)

export const BlogRoutes = router;