import * as cardService from "./cardService.js";
import * as hashDataUtils from "../utils/hashDataUtils.js";
import * as businessesRepository from "../repositories/businessRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";

export async function makePayment(cardId: number, password: string, businessId: number, amount: number) {
    const card = await cardService.findCardById(cardId);
    cardService.verifyExpirationDate(card.expirationDate);
    hashDataUtils.compareHashData(password, card.password);
    const business = await findBusinessById(businessId);
    compareCardType(card.type, business.type);
    const cardBalance = await getBalance(cardId);
    verifyBalance(cardBalance.balance, amount);
    paymentRepository.insert({cardId, businessId, amount});
}

async function findBusinessById(businessId: number) {
    const business = await businessesRepository.findById(businessId);

    if(!business) {
        throw {
            type: "Unauthorized"
        }
    }

    return business;
}

function compareCardType(cartType: string, businessType: string) {
    if(cartType !== businessType) {
        throw {
            type: "Unauthorized"
        }
    }
}

export async function getBalance(cardId: number) {
    const allRecharges = await rechargeRepository.findByCardId(cardId);
    const rechargesAmounts = allRecharges.map(rechargeAmount => rechargeAmount.amount);
    let sumRecharge: number = 0; 
    if(rechargesAmounts.length === 0) {
        sumRecharge = 0;
    } else {
        sumRecharge = rechargesAmounts.reduce((current: number, sum: number) => sum + current);
    }

    const allPayments = await paymentRepository.findByCardId(cardId);
    const paymentsAmounts = allPayments.map(paymentAmount => paymentAmount.amount);
    let sumPayment: number = 0;
    if (paymentsAmounts.length === 0) {
        sumPayment = 0;
    } else {
        sumPayment = paymentsAmounts.reduce((current: number, sum: number) => sum + current);
    }

    const balance = sumRecharge - sumPayment;

    const viewBalance = {
        balance,
        transactions: [...allPayments],
        recharges: [...allRecharges]
    }

    return viewBalance;
}

function verifyBalance(balance: number, amount: number) {
    if (balance < amount) {
        throw {
            type: "Conflict"
        }
    }
}