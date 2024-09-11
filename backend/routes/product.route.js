import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminAccessMiddleware } from "../middlewares/admin-access.middleware.js";

import { createProduct, deleteProduct, getProducts, getFeaturedProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", authMiddleware, adminAccessMiddleware, createProduct);
router.patch("/:id", authMiddleware, adminAccessMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminAccessMiddleware, deleteProduct);

export default router;
