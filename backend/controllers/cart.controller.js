import cartService from "../services/cart.service.js";

export const getCart = async (req, res) => {
    const user = req.user;

    try {
        const cart = user.cartItems;
        res.status(200).json({ data: { cart }, message: "Cart retrieved successfully" });
    } catch (error) {
        console.error("Error (getCart):", error);
        res.status(500).json({ message: error.message });
    }
};

export const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const user = req.user;

    try {
        const cart = await cartService.addItem(user, productId, quantity);
        res.status(200).json({ data: { cart }, message: "Item added to cart successfully" });
    } catch (error) {
        console.error("Error (addItemToCart):", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateItemQuantity = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    try {
        const cart = await cartService.updateItemQuantity(user, productId, quantity);
        res.status(200).json({ data: { cart }, message: "Item quantity updated successfully" });
    } catch (error) {
        console.error("Error (updateItemQuantity):", error);
        res.status(500).json({ message: error.message });
    }
};
