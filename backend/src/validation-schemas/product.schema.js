import Joi from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
});

export const updateProductSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number().min(0),
    category: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
})
