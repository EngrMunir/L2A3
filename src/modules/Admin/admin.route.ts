import express from 'express';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { UserControllers } from '../User/user.controller';
import { BlogControllers } from '../Blog/blog.controller';
import { AdminControllers } from './admin.controller';

const router = express.Router();

  router.patch('/users/:userId/block',
    auth(USER_ROLE.admin), 
    UserControllers.blockUser);
  
  router.delete('/blogs/:id',
    auth(USER_ROLE.admin), 
    AdminControllers.deleteBlog);

export const AdminRoutes = router;
