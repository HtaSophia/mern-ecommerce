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
     * Gets the sales summaries for each day in the given date range.
     * @param {Date} startDate - The start date of the range.
     * @param {Date} endDate - The end date of the range.
     * @return {Promise<{_id: string, total: number, count: number}[]>} An array of objects with the sales summary for each day.
     * Each object contains the date as "_id", the total amount of sales as "total", and the count of orders as "count", sorted in ascending order by date.
     */
    static getSalesSummariesInDateRange(startDate, endDate) {
        return Order.aggregate([
            {
                $match: {
                    status: "completed",
                    updatedAt: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
                    total: { $sum: "$totalAmount" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
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
