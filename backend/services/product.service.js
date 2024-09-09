import Product from "../models/product.model.js";

export default class ProductService {
    /**
     * Retrieves all products in the database.
     * @return {Promise<Product[]>} An array of Product objects.
     */
    static async findAll() {
        return Product.find({});
    }
}
