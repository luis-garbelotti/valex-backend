import { Request, Response } from "express";
import * as employeeService from "../services/employeeService.js";
import * as cardService from "../services/cardService.js";

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
    
    await cardService.activateCard(parseInt(cardId), securityCode, password)
    
    res.sendStatus(200);
}