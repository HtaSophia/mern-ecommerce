import express from "express";

import { validateSchemaMiddleware } from "../middlewares/validate-schema.middleware.js";
import { cartItemSchema } from "../validation-schemas/cart.schemas.js";

import { getCart, addItemToCart, updateItemQuantity, removeItemFromCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCart);
router.post("/item", validateSchemaMiddleware(cartItemSchema), addItemToCart);
router.put("/item/:itemId", validateSchemaMiddleware(cartItemSchema), updateItemQuantity);
router.delete("/item/:itemId", removeItemFromCart);

export default router;
