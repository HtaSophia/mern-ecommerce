import ProductService from "../services/product.service.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.findAll();
        res.status(200).json({ data: { products }, message: "Products retrieved successfully" });
    } catch (error) {
        console.error("Error getting products (getAllProducts):", error);
        res.status(500).json({ message: error.message });
    }
};
