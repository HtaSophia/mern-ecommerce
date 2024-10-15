import { LockIcon, LogInIcon, LogOutIcon, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    // TODO check if user is logged in
    const loggedIn = false;
    const isAdmin = false;

    const authButtons = loggedIn ? (
        <button className="flex items-center gap-2 bg-gray-500 hover:bg-gray-400 transition duration-300 ease-in-out py-2 px-4 rounded">
            <LogOutIcon size={20} />
            <span className="sm:inline">Logout</span>
        </button>
    ) : (
        <Link
            to="/login"
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-400 transition duration-300 ease-in-out py-2 px-4 rounded"
        >
            <LogInIcon size={20} />
            <span className="sm:inline">Login</span>
        </Link>
    );

    return (
        <header className="fixed w-full left-0 top-0 px-4 py-3 bg-sky-800 text-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <Link to="/" className="font-bold text-2xl text-sky-200">
                        E-commerce
                    </Link>

                    <nav className="flex flex-wrap items-center gap-6">
                        <Link to="/" className="text-white hover:text-sky-200 transition duration-300 ease-in-out">
                            Home
                        </Link>

                        {loggedIn && (
                            <Link to="/cart" className="text-white hover:text-sky-200 transition duration-300 ease-in-out relative">
                                <ShoppingCart size={24} />
                                <span className="absolute -top-2 -right-2 rounded-full bg-sky-400 text-xs text-white px-2 py-0.5">3</span>
                                <span className="sr-only">Cart</span>
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                to="/dashboard"
                                className="flex items-center bg-sky-600 hover:bg-sky-400 transition duration-300 ease-in-out py-2 px-4 rounded"
                            >
                                <LockIcon className="inline-block mr-2" size={20} />
                                <span className="sm:inline">Dashboard</span>
                            </Link>
                        )}

                        {authButtons}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
