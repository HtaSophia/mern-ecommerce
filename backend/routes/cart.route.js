import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getCart, addItemToCart, updateItemQuantity, removeItemFromCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/item", authMiddleware, addItemToCart);
router.put("/item/:itemId", authMiddleware, updateItemQuantity);
router.delete("/item/:itemId", authMiddleware, removeItemFromCart);

export default router;
