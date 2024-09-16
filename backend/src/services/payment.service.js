import stripe from "../lib/stripe.js";

import CouponService from "./coupon.service.js";
import OrderService from "./order.service.js";

export default class PaymentService {
    /**
     * Creates a new Stripe Checkout session for the given products and coupon.
     * @param {ObjectId} userId - The ID of the user to create the session for.
     * @param {Product[]} products - The products to include in the session.
     * @param {Coupon | null} coupon - The coupon to apply to the session.
     * @return {Promise<{sessionId: string, totalAmount: number}>} The session ID and total amount.
     */
    static async createCheckoutSession(userId, products, coupon) {
        const lineItems = products.map((product) => ({
            price_data: {
                currency: "brl",
                product_data: {
                    name: product.name,
                    images: [product.image.url],
                },
                unit_amount: product.price * 100, // Convert price to cents
            },
            quantity: product.quantity,
        }));

        const totalAmount = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
        const totalWithDiscount = coupon ? totalAmount - coupon.discountPercentage * totalAmount : totalAmount;

        const order = await OrderService.create({ user: userId, products, totalAmount: totalWithDiscount });

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            payment_method_types: ["card"],
            discounts: coupon ? [{ coupon: coupon.stripeCouponId }] : [],
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/`,
            metadata: {
                userId: userId.toString(),
                couponCode: coupon?.code,
                orderId: order._id.toString(),
            },
        });

        await order.updateOne({ stripeSessionId: session.id });

        return { sessionId: session.id, totalAmount: totalWithDiscount };
    }

    /**
     * Updates the order status after a successful payment and, if applicable, disables the coupon used.
     * @param {string} sessionId - The ID of the Stripe Checkout Session.
     *
     * @throws {Error} If the payment has not been successful.
     *
     * @return {Promise<Order>} The updated order.
     */
    static async finalizeCheckout(sessionId) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            throw new Error("Payment failed");
        }

        if (session.metadata.couponCode) {
            await CouponService.update(session.metadata.couponCode, { isActive: false });
        }

        const updatedOrder = await OrderService.update(session.metadata.orderId, {
            status: "completed",
        });

        return updatedOrder;
    }
}
