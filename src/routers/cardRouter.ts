import { Router } from "express";
import { createCard, activateCard, rechargeCard, getCardBalance } from "../controllers/CardController.js";
import { payment } from "../controllers/paymentController.js";
import { validadeApiKey } from "../middlewares/apiKeyMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import createCardSchema from "../schema/createCardSchema.js";
import activateCardSchema from "../schema/activateCardSchema.js";
import rechargeCardSchema from "../schema/rechargeCardSchema.js";
import paymentCardSchema from "../schema/paymentCardSchema.js";

const cardRouter = Router();

cardRouter.post('/create-card', validadeApiKey, validateSchemaMiddleware(createCardSchema), createCard);
cardRouter.put('/cards/:cardId/activate', validateSchemaMiddleware(activateCardSchema), activateCard);
cardRouter.post('/cards/:cardId/recharge', validadeApiKey, validateSchemaMiddleware(rechargeCardSchema), rechargeCard);
cardRouter.post('/cards/:cardId/payment', validadeApiKey, validateSchemaMiddleware(paymentCardSchema), payment);
cardRouter.get('/cards/:cardId/balance', getCardBalance);

export default cardRouter;