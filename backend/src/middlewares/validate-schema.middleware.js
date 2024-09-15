/**
 * Validate the request body using the given schema.
 * If the validation fails, a 422 response is sent with the error messages.
 * Otherwise, the next middleware in the stack is called.
 * @param {Joi.ObjectSchema} schema - The schema to validate the request body against.
 * @returns {RequestHandler} - The Express middleware function.
 */
export const validateSchemaMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).json({ message: errors.join(", ") });
        }

        next();
    };
};
