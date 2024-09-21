import User from "../models/user.model.js";

/**
 * @typedef PartialUser
 * @property {string} _id
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} role
 **/

export default class UserService {
    /**
     * Creates a new user in the database and returns a user object with a subset of the user's data.
     * @param {{name: string, email: string, password: string}} user - A new user object.
     * @return {Promise<PartialUser>} A user object with a subset of the user's data: {_id, name, email, cartItems, role}.
     */
    static async create(user) {
        const { name, email, password } = user;

        const newUser = await User.create({ name, email, password });

        return {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            cartItems: newUser.cartItems,
            role: newUser.role,
        };
    }

    /**
     * Finds a user by email and returns the user object if found.
     * @param {string} email - The email of the user to find.
     * @return {Promise<User | null>} The user object if found, or null if the user does not exist.
     */
    static async findByEmail(email) {
        return User.findOne({ email });
    }

    /**
     * Finds a user by ID and returns the user object if found.
     * @param {string} id - The ID of the user to find.
     * @return {Promise<User | null>} The user object if found, or null if the user does not exist.
     */
    static async findById(id) {
        return User.findById(id).select("-password");
    }

    /**
     * Gets the total number of users in the database.
     * @return {Promise<number>} The total number of users.
     */
    static async getTotalUsers() {
        return User.countDocuments();
    }

    /**
     * Logs in an existing user and returns a user object with a subset of the user's data.
     * @param {{email: string, password: string}} user - The email and password of the user to log in.
     * @return {Promise<Object>} A user object with a subset of the user's data: {_id, name, email, cartItems, role}.
     * @throws {Error} If the email or password is invalid.
     */
    static async login({ email, password }) {
        const user = await User.findOne({ email });
        const passwordMatches = user && (await user.matchPassword(password));

        if (!user || !passwordMatches) {
            throw new Error("Invalid email or password");
        }
    }
}
