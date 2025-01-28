import { NextFunction, Request, Response } from "express"
import { TUserRole } from "../../modules/User/user.interface"
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User } from "../../modules/User/user.model";

const auth = (...requiredRoles:TUserRole[])=>{
    return catchAsync( async (req:Request, res:Response,next:NextFunction)=>{
        const token = req.headers.authorization?.split(' ')[1];
        console.log('Access token:',token)

        // checking if the token is missing
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized!');
        }

        let decoded;

        try {
            // check if the given token is valid
            decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;
        } catch (err) {
            throw new AppError(httpStatus.UNAUTHORIZED,'Unauthorized');
        }

        const { role, userEmail, iat } = decoded;

        // checking if the user is exist
        const user = await User.isUserExistsByEmail(userEmail);

        if(!user){
            throw new AppError(httpStatus.NOT_FOUND,'This user is not found!!');
        }

        // checking if the user is blocked
        if(user.isBlocked){
            throw new AppError(httpStatus.FORBIDDEN,'This user is blocked')
        }

        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not authorized!!!'
            );
        }

        req.user = decoded as JwtPayload & { role:string};
        next();
    });
};

export default auth;