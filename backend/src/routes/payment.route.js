import express from "express";

import { validateSchemaMiddleware } from "../middlewares/validate-schema.middleware.js";

import { createCheckoutSession, checkoutSuccess } from "../controllers/payment.controller.js";
import { createCheckoutSessionSchema, checkoutSuccessSchema } from "../validation-schemas/payment.schema.js";

const router = express.Router();

router.post("/create-checkout-session", validateSchemaMiddleware(createCheckoutSessionSchema), createCheckoutSession);
router.post("/checkout-success", validateSchemaMiddleware(checkoutSuccessSchema), checkoutSuccess);

export default router;
