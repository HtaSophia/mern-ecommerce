import AnalyticsService from "../services/analytics.service.js";

export const getAnalyticsData = async (req, res) => {
    try {
        const analyticsData = await AnalyticsService.getAnalyticsDataOfTotal();
        const salesData = await AnalyticsService.getSalesAnalyticsData();

        res.status(200).json({ data: { analyticsData, salesData }, message: "Analytics data retrieved successfully" });
    } catch (error) {
        console.error("Error (getAnalyticsData):", error);
        res.status(500).json({ message: error.message });
    }
};
