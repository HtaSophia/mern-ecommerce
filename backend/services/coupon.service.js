import Coupon from "../models/coupon.model.js";

export default class CouponService {
    /**
     * Finds a coupon by the given user ID.
     * @param {string} userId - The ID of the user to find the coupon for.
     * @return {Promise<Coupon | null>} The coupon, or null if no coupon is found.
     */
    static async getCoupon(userId) {
        return Coupon.findOne({ ownerId: userId, isActive: true }).lean();
    }

    /**
     * Validates a coupon code by checking if the coupon exists and is still active.
     * @param {string} code - The coupon code to validate.
     * @return {Promise<Object>} A validated coupon object with a subset of the coupon's data: {code, discountPercentage}.
     * @throws {Error} If the coupon is not found or has expired.
     */
    static async validateCoupon(code) {
        const coupon = await Coupon.findOne({ code, isActive: true });

        if (!coupon) {
            throw new Error("Coupon not found");
        }

        if (coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();

            throw new Error("Coupon expired");
        }

        return { code: coupon.code, discountPercentage: coupon.discountPercentage };
    }
}
