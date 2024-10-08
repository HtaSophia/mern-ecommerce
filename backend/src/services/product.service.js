import cloudinary from "../lib/cloudinary.js";
import redis from "../lib/redis.js";
import Product from "../models/product.model.js";

/**
 * @typedef ProductFilter
 * @property {string} [category] - The category of the product.
 */

export default class ProductService {
    /**
     * Creates a new product and uploads the image to Cloudinary.
     * @param {{name: string, category: string, description: string, image: string, price: number}} product - The product to create.
     * @return {Promise<Product>} The created product.
     */
    static async create(product) {
        const uploadImageResult = await cloudinary.uploader.upload(product.image, { folder: "products" });
        return Product.create({
            ...product,
            image: { url: uploadImageResult.secure_url, publicId: uploadImageResult.public_id },
        });
    }

    /**
     * Retrieves all products in the database.
     * @param {ProductFilter} [filter] - The filter to apply to the query.
     * @return {Promise<Product[]>} An array of Product objects.
     */
    static async findAll(filter = {}) {
        return Product.find({ ...filter }).lean();
    }

    /**
     * Retrieves all featured products in the database.
     * If the featured products are not cached in Redis, they are retrieved from the database
     * and stored in Redis with a TTL of 3 hours.
     * @return {Promise<Product[]>} An array of Product objects.
     */
    static async findAllFeatured() {
        const cachedFeaturedProducts = await redis.get("featured_products");

        if (cachedFeaturedProducts) {
            return JSON.parse(cachedFeaturedProducts);
        }

        const featuredProducts = await Product.find({ isFeatured: true }).lean();

        // Store the featured products in Redis with a TTL of 3 hours
        await redis.set("featured_products", JSON.stringify(featuredProducts), "EX", 60 * 60 * 3);

        return featuredProducts;
    }

    /**
     * Retrieves the total number of products in the database.
     * @return {Promise<number>} The total number of products.
     */
    static async getTotalProducts() {
        return Product.countDocuments();
    }

    /**
     * Updates a product by ID in the database.
     * @param {string} id - The ID of the product to update.
     * @param {Partial<Product>} product - The fields to update on the product.
     * @return {Promise<Product>} The updated product.
     */
    static async updateProduct(id, product) {
        return Product.findByIdAndUpdate(id, { ...product }, { new: true });
    }

    /**
     * Deletes a product by ID from the database and the image from Cloudinary.
     * @param {string} id - The ID of the product to delete.
     * @throws {Error} If the product is not found.
     * @return {Promise<void>}
     */
    static async deleteProduct(id) {
        const product = await Product.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        await Promise.all([cloudinary.uploader.destroy(`products/${product.image.publicId}`), product.deleteOne()]);
    }
}
