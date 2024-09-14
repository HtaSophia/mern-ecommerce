import stripe from "../lib/stripe";

import Coupon from "../models/coupon.model.js";
import { compareDates } from "../utils/date.util.js";
import { generateRandomString } from "../utils/random.util.js";

export default class CouponService {
    /**
     * Creates a coupon and adds it to the given user's coupons.
     * Also creates a coupon in Stripe.
     * @param {{ discountPercentage: number, expirationDate: Date, userId: string }} couponInfo - The info of the coupon to create.
     * @return {Promise<Coupon>} The created coupon.
     */
    static async createToUser({ discountPercentage, expirationDate, userId }) {
        const code = `GIFT${generateRandomString().toUpperCase()}`;

        const stripeCoupon = await stripe.coupons.create({
            duration: "once",
            percent_off: discountPercentage,
            name: code,
        });

        return Coupon.create({ code, discountPercentage, expirationDate, ownerId: userId, stripeCouponId: stripeCoupon.id });
    }

    /**
     * Finds a coupon by the given user ID.
     * @param {string} userId - The ID of the user to find the coupon for.
     * @return {Promise<Coupon | null>} The coupon, or null if no coupon is found.
     */
    static async findOne(code, userId) {
        return Coupon.findOne({ code, ownerId: userId, isActive: true }).lean();
    }

    /**
     * Validates a coupon code by checking if the coupon exists and is still active.
     * @param {string} code - The coupon code to validate.
     * @return {Promise<Object>} A validated coupon object with a subset of the coupon's data: {code, discountPercentage}.
     * @throws {Error} If the coupon is not found or has expired.
     */
    static async validateCode(code) {
        const coupon = await Coupon.findOne({ code, isActive: true });

        if (!coupon) {
            throw new Error("Coupon not found");
        }

        if (compareDates(coupon.expirationDate, "gt", new Date())) {
            coupon.isActive = false;
            await coupon.save();

            throw new Error("Coupon expired");
        }

        return { code: coupon.code, discountPercentage: coupon.discountPercentage };
    }
}
