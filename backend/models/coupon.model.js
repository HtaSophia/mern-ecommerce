import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        discountPercentage: {
            type: Number,
            required: true,
            min: 0,
            max: 1,
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            refer: "User",
            required: false,
            unique: true,
            index: true,
        },
        stripeCouponId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
