import CouponService from "../services/coupon.service.js";

export const getCoupon = async (req, res) => {
    try {
        const coupon = await CouponService.getCoupon(req.user._id);
        res.status(200).json({ data: { coupon }, message: "Coupon found successfully" });
    } catch (error) {
        console.error("Error (getCoupon):", error);
        res.status(500).json({ message: error.message });
    }
};
