import { Router } from "express";
import { createCard, activateCard } from "../controllers/CardController.js";
import { validadeApiKey } from "../middlewares/apiKeyMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import createCardSchema from "../schema/createCardSchema.js";
import activateCardSchema from "../schema/activateCardSchema.js";

const cardRouter = Router();

cardRouter.post('/create-card', validadeApiKey, validateSchemaMiddleware(createCardSchema), createCard);
cardRouter.put('/cards/:cardId/activate', validateSchemaMiddleware(activateCardSchema), activateCard)

export default cardRouter;