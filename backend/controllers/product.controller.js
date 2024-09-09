import ProductService from "../services/product.service.js";

/**
 * Retrieves all products in the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const getAllProducts = async (_req, res) => {
    try {
        const products = await ProductService.findAll();
        res.status(200).json({ data: { products }, message: "Products retrieved successfully" });
    } catch (error) {
        console.error("Error (getAllProducts):", error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Retrieves all featured products in the database, stored in Redis for faster access.
 * Featured products are products with the "isFeatured" property set to true.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const getFeaturedProducts = async (_req, res) => {
    try {
        const products = await ProductService.findAllFeatured();
        res.status(200).json({ data: { products }, message: "Featured products retrieved successfully" });
    } catch (error) {
        console.error("Error (getFeaturedProducts):", error);
        res.status(500).json({ message: error.message });
    }
};
