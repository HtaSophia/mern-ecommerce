import jwt from "jsonwebtoken";
import redis from "../lib/redis.js";

export default class AuthService {
    /**
     * Generates an access token and a refresh token for the given user ID.
     * The access token is valid for 15 minutes and the refresh token is valid for 7 days.
     * @param {string} userId - The user ID.
     * @return {{accessToken: string, refreshToken: string}} An object containing the access token and the refresh token.
     */
    static generateTokens(userId) {
        const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "7d",
        });

        return { accessToken, refreshToken };
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
}
