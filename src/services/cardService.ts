import * as cardRepository from "../repositories/cardRepository.js";
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import * as hashDataUtils from "../utils/hashDataUtils.js";

export async function verifyDuplicatedCardType(cardType: cardRepository.TransactionTypes, employeeId: number) {

    const card = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);

    if(card) {
        throw { type: "Conflict" }
    }

}

export function generateCardData(fullname: string, employeeId: number, cardType: cardRepository.TransactionTypes): cardRepository.CardInsertData {
    const number: string = faker.finance.creditCardNumber('Mastercard');
    const cardholderName: string = generateCardName(fullname);
    const securityCode: string = generateCardCVV(); 
    const expirationDate: string = generateExpirationDate();
    const type: cardRepository.TransactionTypes = cardType;

    return {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type
    }
}

function generateCardName(fullname: string): string {
    const arrayName: string[] = fullname.split(' ');
    const filteredName: string[] = arrayName.slice(1, -1);
    const firstName: string = arrayName.shift().toUpperCase();
    const lastName: string = arrayName.pop().toUpperCase();
    const cardName: string[] = [firstName];
    
    for(let i = 0; i < filteredName.length; i++) {
        if(filteredName[i].length > 3) {
            cardName.push(filteredName[i][0].toUpperCase());
        }
    }
    cardName.push(lastName);

    return cardName.join(' ');
}

function generateCardCVV(): string {
    const cvv: string = faker.finance.creditCardCVV();

    const hashCVV: string = hashDataUtils.hashData(cvv);

    return hashCVV;
}

function generateExpirationDate(): string {
    return dayjs().add(5, 'year').format('MM/YY');
}

export async function insertCard(cardData: cardRepository.CardInsertData) {
    await cardRepository.insert(cardData);
}