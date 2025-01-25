import { Response } from "express";


type TResponse<T>={
    statusCode:number,
    success:boolean,
    message:string,
    data:T
};

const sendResponse =<T>(res:Response, data:TResponse<T>)=>{
    res.status(data?.statusCode).json({
        message:data.message,
        success:data.success,
        data:data.data
    })
}

export default sendResponse;