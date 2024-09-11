import ProductService from "../services/product.service.js";

/**
 * Creates a new product and uploads the image to Cloudinary.
 * @param {{name: string, category: string, description: string, image: string, price: number}} product - The product to create.
 */
export const createProduct = async (req, res) => {
    const { name, category, description, image, price } = req.body;

    try {
        const product = await ProductService.create({ name, category, description, image, price });
        res.status(201).json({ data: { product }, message: "Product created successfully" });
    } catch (error) {
        console.error("Error (createProduct):", error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Retrieves all products in the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
export const getProducts = async (req, res) => {
    const { category } = req.query;
    const filter = category ? { category } : {};

    try {
        const products = await ProductService.findAll(filter);
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

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await ProductService.updateProduct(id, { ...req.body });
        res.status(200).json({ data: { product }, message: "Product updated successfully" });
    } catch (error) {
        console.error("Error (updateProduct):", error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Deletes a product by ID from the database and the image from Cloudinary.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @throws {Error} If the product is not found.
 * @return {Promise<void>}
 */
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductService.deleteProduct(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error (deleteProduct):", error);
        res.status(500).json({ message: error.message });
    }
};
