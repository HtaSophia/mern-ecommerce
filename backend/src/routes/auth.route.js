import express from "express";

import { validateSchemaMiddleware } from "../middlewares/validate-schema.middleware.js";
import { userSignupSchema, userLoginSchema } from "../validation-schemas/user.schema.js";

import { getCurrentUser, login, logout, refreshAccessToken, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/user", getCurrentUser);
router.post("/register", validateSchemaMiddleware(userSignupSchema), register);
router.post("/login", validateSchemaMiddleware(userLoginSchema), login);
router.post("/logout", logout);
router.post("/refresh-token", refreshAccessToken);

export default router;
