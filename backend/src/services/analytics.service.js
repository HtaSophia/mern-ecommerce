import { getLastSevenDays } from "../utils/date.util.js";

import ProductService from "./product.service.js";
import UserService from "../services/user.service.js";
import OrderService from "./order.service.js";

export default class AnalyticsService {
    /**
     * Gets the total number of users, products, sales count, and total sales amount.
     * @return {Promise<{totalUsers: number, totalProducts: number, totalSales: number, totalSalesAmount: number}>}
     */
    static async getAnalyticsDataOfTotal() {
        const [totalUsers, totalProducts, totalSalesSummary] = await Promise.all([
            UserService.getTotalUsers(),
            ProductService.getTotalProducts(),
            OrderService.getTotalSalesSummary(),
        ]);

        return { totalUsers, totalProducts, totalSales: totalSalesSummary.count, totalSalesAmount: totalSalesSummary.totalAmount };
    }

    /**
     * Gets the sales analytics data for the last seven days.
     * Each day contains the total sales amount and count of orders.
     * If there is no sales data for a day, it will be filled with 0 total and count.
     * @return {Promise<{total: number, count: number}[]>} An array of sales data for the last seven days.
     */
    static async getSalesAnalyticsData() {
        const lastSevenDays = getLastSevenDays();
        const [startDate, endDate] = [lastSevenDays.at(-1), lastSevenDays.at(0)];
        const salesSummaries = await OrderService.getSalesSummariesInDateRange(startDate, endDate);

        // _id is in the format "YYYY-MM-DD"
        const salesSummaryByDate = salesSummaries.reduce((result, { _id, ...summary }) => {
            result[_id] = summary;
            return result;
        }, {});

        return lastSevenDays.map((day) => salesSummaryByDate[day] || { total: 0, count: 0 });
    }
}
