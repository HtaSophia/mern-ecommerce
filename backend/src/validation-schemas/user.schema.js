import Joi from "joi";

export const userSignupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});
