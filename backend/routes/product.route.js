import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminAccessMiddleware } from "../middlewares/admin-access.middleware.js";

import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", authMiddleware, adminAccessMiddleware, createProduct);
router.delete("/:id", authMiddleware, adminAccessMiddleware, deleteProduct);

export default router;
