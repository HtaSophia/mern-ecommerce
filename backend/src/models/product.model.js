import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Name is required"] },
        price: {
            type: Number,
            min: 0,
            required: [true, "Price is required"],
        },
        category: { type: String, required: [true, "Category is required"] },
        description: { type: String, required: [true, "Description is required"] },
        image: {
            url: { type: String, required: [true, "Image is required"] },
            publicId: { type: String, required: [true, "Public ID is required"] },
        },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
