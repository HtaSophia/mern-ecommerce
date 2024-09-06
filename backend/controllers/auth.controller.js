import jwt from "jsonwebtoken";
import redis from "../lib/redis.js";
import User from "../models/user.model.js";

/**
 * Creates a new user and returns an access token and a refresh token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });

        const { accessToken, refreshToken } = generateTokens(user._id);

        await storeRefreshToken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                cartItems: user.cartItems,
                role: user.role,
            },
            message: "User created successfully",
        });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const passwordMatches = user && (await user.matchPassword(password));

        if (!user || !passwordMatches) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken);

        res.status(200).json({ user, message: "Logged in successfully" });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (refreshToken) {
            const tokenDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            await redis.del(`refresh_token_${tokenDecoded.userId}`);
        }

        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Generates an access token and a refresh token for the given user ID.
 * The access token is valid for 15 minutes and the refresh token is valid for 7 days.
 * @param {string} userId - The user ID.
 * @return {{accessToken: string, refreshToken: string}} An object containing the access token and the refresh token.
 */
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

/**
 * Stores a refresh token in Redis, with a TTL of 7 days.
 * @param {string} userId - The user ID associated with the refresh token.
 * @param {string} refreshToken - The refresh token to store.
 */
const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token_${userId}`, refreshToken, "EX", 60 * 60 * 24 * 7);
};

/**
 * Sets the access token and refresh token cookies in the response.
 * @param {Response} res - The response object to set the cookies on.
 * @param {string} accessToken - The access token to set.
 * @param {string} refreshToken - The refresh token to set.
 */
const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 15,
    });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
};
