import { Request, Response } from "express";
import * as employeeService from "../services/employeeService.js";
import * as cardService from "../services/cardService.js";
import * as paymentService from "../services/paymentService.js";

export async function createCard(req: Request, res: Response) {
    const { cardType, employeeId } = req.body;

    const employee = await employeeService.validateExistEmployee(employeeId);
    await cardService.verifyDuplicatedCardType(cardType, employeeId);
    const generateCard = cardService.generateCardData(employee.fullName, employee.id, cardType);
    await cardService.insertCard(generateCard);

    res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
    const { cardId } = req.params;
    const { securityCode, password } = req.body;
    
    await cardService.activateCard(parseInt(cardId), securityCode, password);
    
    res.sendStatus(200);
}

export async function rechargeCard(req: Request, res: Response) {
    const { cardId } = req.params;
    const { amount } = req.body;
    
    await cardService.rechargeCardById(parseInt(cardId), amount);
    
    res.sendStatus(201);
    
}

export async function getCardBalance(req: Request, res: Response) {
    const { cardId } = req.params;
    
    await cardService.findCardById(parseInt(cardId));
    const cardBalance = await paymentService.getBalance(parseInt(cardId));

    res.status(200).send(cardBalance);
}

