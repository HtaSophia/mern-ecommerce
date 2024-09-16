import CouponService from "../services/coupon.service.js";
import PaymentService from "../services/payment.service.js";

/**
 * Creates a Stripe Checkout Session and redirects the user to the Stripe Checkout Page.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} couponCode - The coupon code entered by the user, if any.
 * @param {Product[]} products - The products in the user's cart.
 *
 * @throws {Error} If the cart is empty.
 */
export const createCheckoutSession = async (req, res) => {
    const { couponCode, products } = req.body;
    const user = req.user;

    if (products.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    try {
        const coupon = couponCode ? await CouponService.findOne(couponCode, req.user._id) : null;
        const checkoutSession = await PaymentService.createCheckoutSession(user._id, products, coupon);

        res.status(200).json({ data: { ...checkoutSession }, message: "Checkout session created" });
    } catch (error) {
        console.error("Error (createCheckoutSession):", error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Updates the order status after a successful payment and, if applicable, disables the coupon used.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {string} sessionId - The ID of the Stripe Checkout Session.
 *
 * @throws {Error} If the payment has not been successful.
 */
export const checkoutSuccess = async (req, res) => {
    const { sessionId } = req.body;

    try {
        const order = await PaymentService.finalizeCheckout(sessionId);
        res.status(200).json({ data: { order }, message: "Successful payment" });
    } catch (error) {
        console.error("Error (checkoutSuccess):", error);
        res.status(500).json({ message: error.message });
    }
};
