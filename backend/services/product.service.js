import redis from "../lib/redis.js";
import Product from "../models/product.model.js";

export default class ProductService {
    /**
     * Retrieves all products in the database.
     * @return {Promise<Product[]>} An array of Product objects.
     */
    static async findAll(filter = {}) {
        return Product.find().lean();
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
}
