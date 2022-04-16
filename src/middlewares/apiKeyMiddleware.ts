import { Request, Response, NextFunction } from "express";
import * as companyService from "../services/companyService.js";

export async function validadeApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if(!apiKey) {
        throw {
            type: "Bad_Request"
        }
    }

    const company = await companyService.findCompanyByApiKey(apiKey.toString());

    res.locals.company = company;

    next();
}