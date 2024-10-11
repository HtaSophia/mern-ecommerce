import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LoaderIcon, LockIcon, LogInIcon, MailIcon } from "lucide-react";

const LoginPage = () => {
    const loading = false;
    const [userForm, setUserForm] = useState({ email: "", password: "" });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userForm);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col justify-center h-svh bg-gradient-to-br from-cyan-500 to-sky-800">
            <motion.div
                className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 sm:mx-auto sm:w-full sm:max-w-md"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <h1 className="text-center text-3xl font-semibold tracking-tight text-gray-900">Welcome back!</h1>

                <section className="mt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="text-sm text-gray-600">
                                Email
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1  ring-gray-400 placeholder:text-gray-400 focus:outline-none  focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    placeholder="andrewsmith@me.com"
                                    value={userForm.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm text-gray-600">
                                Password
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1  ring-gray-400 placeholder:text-gray-400 focus:outline-none  focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    placeholder="********"
                                    value={userForm.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 flex items-center justify-center rounded-md shadow-sm font-medium text-white bg-sky-600 hover:bg-sky-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <LoaderIcon className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <LogInIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                                    Login
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold leading-6 text-sky-600 hover:text-sky-500 transition duration-300 ease-in-out"
                        >
                            Sign up
                        </Link>
                    </p>
                </section>
            </motion.div>
        </div>
    );
};

export default LoginPage;
