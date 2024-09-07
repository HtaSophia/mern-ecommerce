import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";

/**
 * Creates a new user and adds an access token and a refresh token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await UserService.create({ name, email, password });

        const { accessToken, refreshToken } = AuthService.generateTokens(user._id);
        await AuthService.storeRefreshToken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken);

        res.status(201).json({ user, message: "User created successfully" });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Logs in an existing user and adds an access token and a refresh token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserService.findByEmail(email);
        const passwordMatches = user && (await user.matchPassword(password));

        if (!user || !passwordMatches) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const { accessToken, refreshToken } = AuthService.generateTokens(user._id);
        await AuthService.storeRefreshToken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken);

        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                cartItems: user.cartItems,
                role: user.role,
            },
            message: "Logged in successfully",
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Clears the access and refresh token cookies in the response.
 * @param {Response} res - The response object to clear the cookies on.
 * @param {string} refreshToken - The refresh token to remove from Redis.
 * @returns {Promise<void>}
 */
export const logout = async (req, res) => {
    try {
        await AuthService.deleteRefreshToken(req.cookies.refresh_token);
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: error.message });
    }
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
