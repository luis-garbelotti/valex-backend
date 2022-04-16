import { Router } from "express";
import { createCard } from "../controllers/CardController.js";
import { validadeApiKey } from "../middlewares/apiKeyMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import createCardSchema from "../schema/createCardSchema.js";

const cardRouter = Router();

cardRouter.post('/create-card', validadeApiKey, validateSchemaMiddleware(createCardSchema), createCard);

export default cardRouter;