import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { createBlogValidationSchema } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get('/',

  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.getAllBlog),

  router.post(
    '/',
    auth(USER_ROLE.user),
    validateRequest(createBlogValidationSchema),
    BlogControllers.createBlog,
  ),
  router.patch('/:id',
    auth(USER_ROLE.user), 
    BlogControllers.updateBlog);
  
  router.delete('/:id',
    auth(USER_ROLE.user), 
    BlogControllers.deleteBlog);

export const BlogRoutes = router;
