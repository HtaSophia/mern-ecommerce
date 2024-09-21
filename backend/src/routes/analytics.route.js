import express from "express";

import { getAnalyticsData } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", getAnalyticsData);

export default router;
