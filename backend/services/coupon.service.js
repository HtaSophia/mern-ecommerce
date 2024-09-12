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
}
