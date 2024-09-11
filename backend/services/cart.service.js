import User from "../models/user.model.js";

/**
 * @typedef CartItem
 * @property {ObjectId} product
 * @property {number} quantity
 */

export default class CartService {
    /**
     * Adds a product to a user's cart.
     * @param {User} user - The user to add the product to.
     * @param {string} productId - The ID of the product to add.
     * @param {number} quantity - The quantity of the product to add.
     * @return {Promise<CartItem[]>} The updated cart.
     */
    static async addItem(user, productId, quantity) {
        const cartItems = [...user.cartItems];

        const existingItem = cartItems.find((item) => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({ product: productId, quantity });
        }

        return CartService.updateCartItems(user._id, cartItems);
    }

    /**
     * Updates the quantity of an item in a user's cart.
     * @param {User} user - The user to update the item for.
     * @param {string} productId - The ID of the item to update.
     * @param {number} quantity - The new quantity of the item.
     * @return {Promise<CartItem[]>} The updated cart.
     */
    static async updateItemQuantity(user, productId, quantity) {
        const cartItems = [...user.cartItems];

        const item = cartItems.find((item) => item.productId === productId);

        if (quantity === 0) {
            return CartService.removeItem(user, productId);
        }

        item.quantity = quantity;
        return CartService.updateCartItems(user._id, cartItems);
    }

    /**
     * Updates a user's cart items in the database.
     * @param {ObjectId} userId - The ID of the user to update.
     * @param {CartItem[]} cartItems - The new cart items for the user.
     * @return {Promise<CartItem[]>} The updated cart.
     */
    static async updateCartItems(userId, cartItems) {
        const updatedUser = await User.findByIdAndUpdate(userId, { cartItems }, { new: true }).select("cartItems");
        return updatedUser.cartItems;
    }
}
