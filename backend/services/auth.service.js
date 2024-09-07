import jwt from "jsonwebtoken";
import redis from "../lib/redis.js";

export default class AuthService {
    /**
     * Generates an access token for the given user ID.
     * The access token is valid for 15 minutes.
     * @param {string} userId - The user ID.
     * @return {string} The access token.
     */
    static generateAccessToken(userId) {
        return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "15m",
        });
    }

    /**
     * Generates a refresh token for the given user ID.
     * The refresh token is valid for 7 days.
     * @param {string} userId - The user ID.
     * @return {string} The refresh token.
     */
    static generateRefreshToken(userId) {
        return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "7d",
        });
    }

    /**
     * Stores a refresh token in Redis, with a TTL of 7 days.
     * @param {string} userId - The user ID associated with the refresh token.
     * @param {string} refreshToken - The refresh token to store.
     */
    static async storeRefreshToken(userId, refreshToken) {
        await redis.set(`refresh_token_${userId}`, refreshToken, "EX", 60 * 60 * 24 * 7);
    }

    /**
     * Clears the access and refresh token cookies in the response.
     * @param {Response} res - The response object to clear the cookies on.
     * @param {string} refreshToken - The refresh token to remove from Redis.
     * @returns {Promise<void>}
     */
    static async deleteRefreshToken(refreshToken) {
        if (refreshToken) {
            const tokenDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            await redis.del(`refresh_token_${tokenDecoded.userId}`);
        }
    }

    /**
     * Validates a refresh token by verifying if it matches the stored token in Redis.
     * @param {string} refreshToken - The refresh token to validate.
     * @return {Promise<{valid: boolean, userId: string}>} A valid property indicating
     *     if the token is valid or not, and a userId property if the token is valid.
     */
    static async validateRefreshToken(refreshToken) {
        const tokenDecoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const userId = tokenDecoded.userId;
        const storedRefreshToken = await redis.get(`refresh_token_${userId}`);

        if (storedRefreshToken === refreshToken) {
            return { valid: true, userId };
        }

        return { valid: false };
    }
}
