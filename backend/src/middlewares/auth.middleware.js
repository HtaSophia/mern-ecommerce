import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;

        if (!accessToken) return res.status(401).json({ message: "Unauthorized: No access token provided" });

        const userId = AuthService.decodeAccessToken(accessToken);
        const user = await UserService.findById(userId);

        if (!user) return res.status(401).json({ message: "Unauthorized: User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.error("Error authenticating:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized: Access token expired" });
        }

        res.status(500).json({ message: error.message });
    }
};
