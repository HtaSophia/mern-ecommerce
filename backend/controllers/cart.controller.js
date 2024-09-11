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

