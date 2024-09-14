import CouponService from "../services/coupon.service.js";

export const getCoupon = async (req, res) => {
    try {
        const coupon = await CouponService.findOne(req.user._id);
        res.status(200).json({ data: { coupon }, message: "Coupon found successfully" });
    } catch (error) {
        console.error("Error (getCoupon):", error);
        res.status(500).json({ message: error.message });
    }
};

export const validateCoupon = async (req, res) => {
    const { couponCode } = req.body;

    try {
        const coupon = await CouponService.validateCode(couponCode);
        res.status(200).json({ data: { coupon }, message: "Coupon is valid" });
    } catch (error) {
        // TODO Add error handling
        console.error("Error (validateCoupon):", error);
        res.status(500).json({ message: error.message });
    }
};
