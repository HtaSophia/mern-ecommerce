import Order from "../models/order.model.js";
import stripe from "../lib/stripe.js";

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

        const order = await PaymentService.createOrder({ user: userId, products, totalAmount: totalWithDiscount });

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
     * Retrieves a Stripe Checkout session by its ID.
     * @param {string} sessionId - The ID of the Checkout session to retrieve.
     * @return {Object>} The retrieved Checkout session.
     */
    static async getCheckoutSession(sessionId) {
        return stripe.checkout.sessions.retrieve(sessionId);
    }

    /**
     * Creates a new order in the database.
     * @param {Order} order - The order to create.
     * @return {Promise<Order>} The created order.
     */
    static async createOrder(order) {
        return Order.create({ ...order });
    }

    /**
     * Updates an existing order in the database.
     * @param {ObjectId} orderId - The ID of the order to update.
     * @param {Partial<Order>} order - The updated order.
     * @return {Promise<Order>} The updated order.
     */
    static async updateOrder(orderId, order) {
        return Order.findByIdAndUpdate(orderId, order, { new: true }).lean();
    }
}
