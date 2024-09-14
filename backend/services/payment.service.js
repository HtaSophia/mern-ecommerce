import Order from "../models/order.model.js";
import stripe from "../lib/stripe";

export default class PaymentService {
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
