import { NextFunction, Request, Response } from "express";

const serviceErrorToStatusCode = {
    Unauthorized: 401,
    Conflict: 409,
    Bad_Request: 400,
    Not_Found: 404,
    Unprocessable_Entity: 422
};


export default function handleErrorsMiddleware(err, req: Request, res: Response, next: NextFunction) {
    if(err.type) {
        return res.sendStatus(serviceErrorToStatusCode[err.type]);
    }

    res.sendStatus(500);
}