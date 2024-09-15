import express from "express";

import { validateSchemaMiddleware } from "../middlewares/validate-schema.middleware.js";
import { userSignupSchema, userLoginSchema } from "../validation-schemas/user.schema.js";

import { login, logout, refreshAccessToken, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", validateSchemaMiddleware(userSignupSchema), signup);
router.post("/login", validateSchemaMiddleware(userLoginSchema), login);
router.post("/logout", logout);
router.post("/refresh-token", refreshAccessToken);

export default router;
