import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";

import { authMiddleware } from "./middlewares/auth.middleware.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import productRoutes from "./routes/product.route.js";
import paymentRoutes from "./routes/payment.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", authMiddleware, cartRoutes);
app.use("/api/coupons", authMiddleware, couponRoutes);
app.use("/api/payments", authMiddleware, paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    connectDB();
});
