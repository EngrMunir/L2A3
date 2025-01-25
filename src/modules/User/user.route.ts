import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../app/middleware/validateRequest';
import { createUserValidationSchema } from './user.validation';

const router = express.Router();

router.post(
    '/register',
    validateRequest(createUserValidationSchema),
    UserControllers.createUser
)

export const UserRoutes = router;