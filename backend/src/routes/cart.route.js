import express from "express";

import { getCart, addItemToCart, updateItemQuantity, removeItemFromCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getCart);
router.post("/item", addItemToCart);
router.put("/item/:itemId", updateItemQuantity);
router.delete("/item/:itemId", removeItemFromCart);

export default router;
