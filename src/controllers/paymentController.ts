import { Request, Response } from "express";
import * as paymentService from "../services/paymentService.js";

export async function payment(req: Request, res: Response) {
    const { cardId } = req.params;
    const { businessId, amount, password } = req.body;

    await paymentService.makePayment(parseInt(cardId), password, businessId, amount);

    res.sendStatus(201);
}