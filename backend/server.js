import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to accept json data

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    connectDB();
});