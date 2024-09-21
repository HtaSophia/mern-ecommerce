import Order from "../models/order.model.js";

export default class OrderService {
    /**
     * Creates a new order in the database.
     * @param {Order} order - The order to create.
     * @return {Promise<Order>} The created order.
     */
    static async create(order) {
        return Order.create({ ...order });
    }

    /**
     * Gets the total amount of all orders and the count of orders in the database.
     * @return {Promise<{totalAmount: number, count: number}>} The total amount and count of orders.
     */
    static async getTotalSalesSummary() {
        const [salesData] = Order.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" },
                    count: { $sum: 1 },
                },
            },
        ]);

        return { totalAmount: salesData.total, count: salesData.count };
    }

    /**
     * Updates an existing order in the database.
     * @param {ObjectId} orderId - The ID of the order to update.
     * @param {Partial<Order>} order - The updated order.
     * @return {Promise<Order>} The updated order.
     */
    static async update(orderId, order) {
        return Order.findByIdAndUpdate(orderId, order, { new: true }).lean();
    }
}
