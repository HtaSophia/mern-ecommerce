import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminAccessMiddleware } from "../middlewares/admin-access.middleware.js";
import { validateSchemaMiddleware } from "../middlewares/validate-schema.middleware.js";

import { createProduct, deleteProduct, getProducts, getFeaturedProducts, updateProduct } from "../controllers/product.controller.js";
import { createProductSchema, updateProductSchema } from "../validation-schemas/product.schema.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.post("/", authMiddleware, adminAccessMiddleware, validateSchemaMiddleware(createProductSchema), createProduct);
router.patch("/:id", authMiddleware, adminAccessMiddleware, validateSchemaMiddleware(updateProductSchema), updateProduct);
router.delete("/:id", authMiddleware, adminAccessMiddleware, deleteProduct);

export default router;
