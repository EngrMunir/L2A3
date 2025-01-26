import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { createBlogValidationSchema } from './blog.validation';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.get(
    '/',
    BlogControllers.getAllBlog
),
router.post(
    '/',
    validateRequest(createBlogValidationSchema),
    BlogControllers.createBlog
),
router.delete(
    '/:id',
    BlogControllers.deleteBlog,
)

export const BlogRoutes = router;