import joi from "joi"

const paymentCardSchema = joi.object({
    businessId: joi.number().required(),
    amount: joi.number().min(1).required(),
    password: joi.string().required()
});

export default paymentCardSchema;