import Joi from "joi";

export const createCheckoutSessionSchema = Joi.object({
    couponCode: Joi.string(),
    products: Joi.array().items(Joi.string()).required(),
});

export const checkoutSuccessSchema = Joi.object({
    sessionId: Joi.string().required(),
})
