import Joi from "joi";

export const cartItemSchema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required().min(1),
});
