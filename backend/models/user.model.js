import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const CUSTOM_VALIDATION = {
    userExists: {
        type: "DUPLICATED",
        error: "Email already exists in the database.",
    },
};

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
        cartItems: [
            {
                quantity: {
                    type: Number,
                    default: 1,
                },
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Product",
                },
            },
        ],
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer",
        },
    },
    { timestamps: true }
);

/**
 * Validate if email exists in the database, if it does, throw an error
 */
userSchema.path("email").validate(
    async function (email) {
        const emailCount = await mongoose.models.User.countDocuments({ email });
        return !emailCount;
    },
    CUSTOM_VALIDATION.userExists.error,
    CUSTOM_VALIDATION.userExists.type
);

/**
 * Pre-save hook to hash the password before saving to the database
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;